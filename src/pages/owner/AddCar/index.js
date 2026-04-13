import React, { useEffect, useState } from "react";
import "./addCar.css";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import UploadField from "../../../components/UploadField";
import { API } from "../../../helpers/requests";
import { PATH } from "../../../helpers/constants";
import { getCoordinatesFromGoogle } from "../../../helpers/methods";
import BackButton from "../../../components/BackButton/BackButton";
import { useNavigate } from "react-router";

const ownerDetails = {
  name: "",
  carModel: "",
  mobileNumber: null,
  email: null,
  type: null,
  price: {
    selling_price: null,
    striked_price: null,
  },
  description: null,
  area: {
    address: null,
    city: null,
  },
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
};

function AddCar() {
  const [images, setImages] = useState([]);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [visibleMessage, setShowVisibleMessage] = useState("");
  const [messageColor, setMessageColor] = useState(false);

  const [details, setDetails] = useState(ownerDetails);

  const navigate = useNavigate();

  const saveCar = async (detailsToSave = details) => {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("image", images[i], images[i].name);
    }

    Object.keys(detailsToSave).forEach((key) => {
      const stringifiableKeys = ["area", "location", "price"];
      if (stringifiableKeys.includes(key)) {
        formData.append(key, JSON.stringify(detailsToSave[key]));
        return;
      }
      formData.append(key, detailsToSave[key]);
    });

    try {
      await API.post(PATH.SAVE_CAR, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowVisibleMessage("Car added successfully!");
      setMessageColor(true);
    } catch (error) {
      setShowVisibleMessage("Failed to add car!");
      setMessageColor(false);
    }
  };

  useEffect(() => {
    if (!isReadyToSubmit) return;
    saveCar();
  }, [isReadyToSubmit]);

  const onCarModelChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      carModel: e.target.value,
    }));
  };

  const onNameChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const onMobileNumberChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      mobileNumber: e.target.value,
    }));
  };

  const onEmailChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const onImagesChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setImages(filesArray);
  };

  const onCarTypeChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const onCarAddressChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      area: {
        ...prev.area,
        address: e.target.value,
      },
    }));
  };

  const onCarAskingPriceChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        selling_price: Number(e.target.value),
      },
    }));
  };

  const onCarDescriptionChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  async function onSubmit(e) {
    e.preventDefault();

    if (
      !images.length ||
      !details.type ||
      !details.description ||
      !details.price?.selling_price ||
      !details.area?.address
    ) {
      setShowVisibleMessage("Please fill all required fields");
      setMessageColor(false);
      alert("Fill all the fields");
      return;
    }

    setShowVisibleMessage("Adding To List...");
    setMessageColor(true);
    alert("car Added successfully");
    navigate("/");

    const coordinates = await getCoordinatesFromGoogle(details.area.address);

    let nextDetails = { ...details };

    if (coordinates) {
      nextDetails.location = {
        type: "Point",
        coordinates: [coordinates.latitude, coordinates.longitude],
      };
    }

    setDetails(nextDetails);

    saveCar(nextDetails);
    const timer = setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  function onClick() {
    navigate("./your-listing");
  }

  return (
    <>
      <div className="main-body">
        <div className="main-container">
          <h1 id="title" className="text-center">
            List Your Car
          </h1>

          <div className="form-wrap">
            <form id="survey-form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label id="name-label" htmlFor="name">
                      Name
                    </label>
                    <InputField
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                      className="form-control"
                      onChange={onNameChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label id="email-label" htmlFor="email">
                      Car Model
                    </label>
                    <InputField
                      type="text"
                      name="text"
                      id="model"
                      placeholder="Enter car name"
                      className="form-control"
                      onChange={onCarModelChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label id="name-label" htmlFor="name">
                      Phone Number
                    </label>
                    <InputField
                      type="number"
                      name="name"
                      id="name"
                      placeholder="Enter your Number"
                      className="form-control"
                      onChange={onMobileNumberChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label id="email-label" htmlFor="email">
                      Fuel Type
                    </label>
                    <InputField
                      type="text"
                      name="text"
                      id="model"
                      placeholder="Fuel Type"
                      onChange={(e) =>
                        setDetails((prev) => ({
                          ...prev,
                          fuel_type: e.target.value,
                        }))
                      }
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label id="number-label" htmlFor="number">
                      Upload Images <small>(Upto 4)</small>
                    </label>
                    <UploadField
                      type="file"
                      name="image"
                      id="file"
                      className="form-control p-2"
                      placeholder="Image"
                      onChange={onImagesChange}
                      accept="image/*"
                      multiple
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>car type</label>
                    <select
                      id="dropdown"
                      name="role"
                      className="form-control"
                      value={details.type || ""}
                      onChange={onCarTypeChange}
                      required
                    >
                      <option disabled value="">
                        Select
                      </option>
                      <option value="Manual">Manual</option>
                      <option value="CNG">CNG</option>
                      <option value="Electric">Electric</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label id="email-label" htmlFor="email">
                      Car Adress
                    </label>
                    <input
                      type="text"
                      name="text"
                      id="model"
                      placeholder="Enter Car Address"
                      onChange={onCarAddressChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="askingPrice">Asking Price</label>
                    <div className="input-group">
                      <InputField
                        type="number"
                        name="askingPrice"
                        id="askingPrice"
                        className="form-control"
                        placeholder="Enter asking price"
                        onChange={onCarAskingPriceChange}
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Car Description</label>
                    <textarea
                      id="comments"
                      className="form-control"
                      name="comment"
                      onChange={onCarDescriptionChange}
                      placeholder="Enter details about your car ..."
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <Button
                    type="submit"
                    id="submit"
                    className="btn btn-primary btn-block w-100"
                    onClick={onSubmit}
                  >
                    Add To Listing
                  </Button>

                  <p
                    style={{
                      color: messageColor ? "green" : "red",
                      textAlign: "Center",
                    }}
                  >
                    {visibleMessage}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCar;
