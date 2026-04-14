import "./index.css";
import CarDetails from "./CarDetails";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { PUBLIC_API } from "../../helpers/requests";
import { getCoordinatesFromGoogle } from "../../helpers/methods";
import tick from "../../assets/check-mark.png"
import cars from "../../assets/cars.png"
import delivery from "../../assets/fast-delivery.png"
import pay from "../../assets/mobile-payment.png"

function CarList({ showEditDeleteButtons = false }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("location");

  useEffect(() => {
    async function fetchCoords() {
      setLoading(true); 

      try {
        let coordinates = null;

        if (city) {
          coordinates = await getCoordinatesFromGoogle(city);
        }

        const url = city
          ? `/cars?lat=${coordinates.latitude}&long=${coordinates.longitude}`
          : "/cars";

        const res = await PUBLIC_API.get(url, { withCredentials: false });
        setList(res.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoords();
  }, [city]);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setList(list.filter((_, i) => i !== index));
    }
  };

  const handleEdit = (index) => {
    const car = list[index];
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
    <div className="main-holder">
      <h1 className="txt">
        {city ? `Top cars in ${city}` : "Top cars in India"}
      </h1>

      {/* ✅ LOADING UI */}
      {loading ? (
        <div className="loading">
          <h2>Loading data, please wait...</h2>
        </div>
      ) : (
        <div className="item-holder">
          {list.length > 0 ? (
            list.map((item, index) => (
              <CarDetails
                key={item._id}
                Image={item.images[0]}
                Name={item.name}
                Price={item.price?.selling_price}
                Description={item.description}
                id={item._id}
                index={index}
                onDelete={handleDelete}
                onEdit={handleEdit}
                showButtons={showEditDeleteButtons}
              />
            ))
          ) : (
            <h3>No cars found</h3> 
          )}
        </div>
      )}

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
                  setEditForm({
                    ...editForm,
                    description: e.target.value,
                  })
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

      <div className="benefits-section">
        <div className="benefit">
          <img src={tick} alt="benefit" />
          <h3>100%</h3>
          <p>Hassle free Secured Trip</p>
        </div>
        <div className="benefit">
          <img src={cars} alt="benefit" />
          <h3>25000+</h3>
          <p>Quality cars in the city</p>
        </div>
        <div className="benefit">
          <img src={delivery} alt="benefit" />
          <h3>Delivery</h3>
          <p>Anywhere, Anytime</p>
        </div>
        <div className="benefit">
          <img src={pay} alt="benefit" />
          <h3>Endless</h3>
          <p>Pay by hour, drive limitless</p>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 GoDrive. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CarList;
