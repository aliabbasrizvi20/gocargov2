import "./index.css";
import Logintocheckout from "../Side Login/Logincart";
// import { Form, Link } from "react-router";
// import { useNavigate } from "react-router";
// import Button from "../Button";
import BackButton from "../BackButton/BackButton";
// import editIcon from "./4226577.png";
// import CarDetails from "../CarLists/CarDetails";
// import { API, PUBLIC_API } from "../../helpers/requests";

import { API } from "../../helpers/requests";
import { useState } from "react";
export default function CarData({
  Banner,
  Images,
  Host,
  Detail,
  Des,
  Price,
  car,
}) {
  const [editCarDetail, setEditCarDetail] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const handleData = () => {
    API.post("/car", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };
  const onChangeHost = (e) => {
    setNewAddress(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="side-content-holder">
          <div className="little">
            <BackButton />
          </div>

          <div className="image-container">
            <div className="banner-image">
              <img src={Banner} />
            </div>
            <div className="side-images">
              {Images.slice(0, 4).map(function (url) {
                return <img src={url} />;
              })}
            </div>
          </div>

          <div className="Des">
            <h6>
              Hosted By <b>{Detail}</b>
            </h6>
            <h6>{Des}</h6>
            <h5>{Price}</h5>
          </div>
        </div>

        <div className="right-continer">
          <Logintocheckout car={car} />
        </div>
      </div>

      {editCarDetail && (
        <div className="EditFields">
          <div className="inputEdits">
            <form onSubmit={handleData}>
              <input
                type="text"
                placeholder={car.area?.address || "Enter new address"}
                onChange={onChangeHost}
                value={newAddress}
              />
              <textarea
                placeholder="Enter new description"
                defaultValue={car.description}
              />
              <input
                type="number"
                placeholder={car.price?.selling_price || "Enter new price"}
              />
              <button type="submit">Update Details</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
