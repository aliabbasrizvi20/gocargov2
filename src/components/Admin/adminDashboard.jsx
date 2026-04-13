import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API } from "../../helpers/requests";
import "./adminDashboard.css";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [cars, setCars] = useState([]);
  const [editCar, setEditCar] = useState(null);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (isAdmin) {
      fetchOrders();
      fetchCars();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCar = (id) => {
    setCars((prev) => prev.filter((car) => car._id !== id));
  };

  const updateCar = () => {
    setCars((prev) =>
      prev.map((car) => (car._id === editCar._id ? editCar : car))
    );
    setEditCar(null);
  };

  if (!isAdmin) {
    return <div className="admin-dashboard__denied">Access Denied (Admin Only)</div>;
  }

  return (
    <div className="admin-dashboard">

      <h1 className="admin-dashboard__title">Admin Dashboard</h1>

      <h2 className="admin-dashboard__section-title">Orders</h2>

      <div className="admin-dashboard__orders-table">
        {orders.map((o) => (
          <div key={o._id} className="admin-dashboard__order-row">

            <div>{o.userId?.name}</div>
            <div>{o.userId?.email}</div>
            <div>{o.carId?.name}</div>
            <div>₹{o.amount}</div>

            <div className="admin-dashboard__status">{o.status}</div>

            <button
              className="admin-dashboard__view-btn"
              onClick={() => navigate(`/cars/${o.carId?._id}`)}
            >
              View Car
            </button>

          </div>
        ))}
      </div>

      <h2 className="admin-dashboard__section-title">Cars Management</h2>

      <div className="admin-dashboard__car-grid">
        {cars.map((car) => (
          <div key={car._id} className="admin-dashboard__car-card">

            <img
              src={car.images?.[0] || "https://via.placeholder.com/200"}
              alt="car"
              className="admin-dashboard__car-img"
              onClick={() => navigate(`/cars/${car._id}`)}
            />

            <h3>{car.name}</h3>
            <p className="admin-dashboard__price">₹{car.price?.selling_price}</p>

            <div className="admin-dashboard__btn-group">

              <button
                className="admin-dashboard__edit-btn"
                onClick={() => setEditCar(car)}
              >
                Edit
              </button>

              <button
                className="admin-dashboard__delete-btn"
                onClick={() => deleteCar(car._id)}
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

      {editCar && (
        <div className="admin-dashboard__modal">

          <div className="admin-dashboard__modal-box">

            <h2>Edit Car</h2>

            <input
              value={editCar.name}
              onChange={(e) =>
                setEditCar({ ...editCar, name: e.target.value })
              }
              placeholder="Car Name"
            />

            <input
              type="number"
              value={editCar.price?.selling_price}
              onChange={(e) =>
                setEditCar({
                  ...editCar,
                  price: {
                    ...editCar.price,
                    selling_price: e.target.value,
                  },
                })
              }
              placeholder="Price"
            />

            <div className="admin-dashboard__modal-actions">

              <button className="admin-dashboard__save-btn" onClick={updateCar}>
                Save
              </button>

              <button
                className="admin-dashboard__cancel-btn"
                onClick={() => setEditCar(null)}
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;