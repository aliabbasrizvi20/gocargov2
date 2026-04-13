// import AddCar from "../../pages/owner/AddCar/index";
import CarDetails from "../CarLists/CarDetails";
import "../CarLists/index.css";
// import { Navigate, useNavigate } from "react-router";
// import { PUBLIC_API } from "../../helpers/requests";
import { API } from "../../helpers/requests";
import { useEffect, useState } from "react";
// import Button from "../Button";
import { selectIsAuthenticated } from "../../store/auth/authSelector";
import { useSelector } from "react-redux";

export default function OwnerAddedCarList() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [list, setList] = useState([]);
  const [isCarAdded, setIsCarAdded] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setIsCarAdded("Please Login to see your added cars");
      setList([]);
      return;
    } else {
      API.get("cars/my-cars", { withCredentials: true })
        .then((res) => {
          // console.log(res.data)
          if (res.data.length === 0) {
            setIsCarAdded("No car added, please add a car");
          } else {
            setList(res.data);
            setIsCarAdded(" ");
          }
        })
        .catch((err) => console.error(err));
    }
  }, [isAuthenticated]);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setList(list.filter((_, i) => i !== index));
    }
  };

  const handleEdit = (index) => {
    const car = list[index];
    console.log("Car data for editing:", car);
    setEditingIndex(index);
    setEditForm({
      name: car.name,
      price: car.price?.selling_price || "",
      description: car.description,
    });
  };

  const handleSaveEdit = () => {
    const updatedList = [...list];
    updatedList[editingIndex] = {
      ...updatedList[editingIndex],
      name: editForm.name,
      price: {
        ...updatedList[editingIndex].price,
        selling_price: editForm.price,
      },
      description: editForm.description,
    };
    setList(updatedList);
    setEditingIndex(null);
    setEditForm({ name: "", price: "", description: "" });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditForm({ name: "", price: "", description: "" });
  };

  return (
    <div className="item-holder">
      <p>{isCarAdded}</p>
      {list.map((item, index) => {
        return (
          <>
            <CarDetails
              Image={item.images[0]}
              Name={item.name}
              Price={item.price?.selling_price}
              Description={item.description}
              id={item._id}
              index={index}
              onDelete={handleDelete}
              onEdit={handleEdit}
              showButtons={true}
            />
          </>
        );
      })}

      {editingIndex !== null && (
        <div className="edit-modal">
          <div className="edit-form">
            <h3>Edit Car Details</h3>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Price (₹/hr):</label>
              <input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                rows="4"
              />
            </div>
            <div className="edit-buttons">
              <button onClick={handleSaveEdit} className="save-btn">
                Save Changes
              </button>
              <button onClick={handleCancelEdit} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
