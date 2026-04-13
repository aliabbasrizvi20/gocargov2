import { BrowserRouter, Route, Routes } from "react-router";
import CarList from "./components/CarLists/carList";
import SearchCars from "./components/SearchCars";
import CarLayout from "./layout/CarLayout";
import ViewCar from "./components/Viewcar/ViewCar";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import OwnerLayout from "./layout/OwnerLayout";
import AddCar from "./pages/owner/AddCar";
import OrderSuccess from "./pages/rent/OrderSuccess";
import OwnerAddedCarList from "./components/OwnerAddedCarList/OwnerAddedCarList";
import { fetchCurrentUser } from "./store/auth/authAction";
import AdminDashboard from "./components/Admin/adminDashboard";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Car Rental Routes */}
        <Route path="/" element={<CarLayout />}>
          <Route index element={<SearchCars />} />
          <Route path="list" element={<CarList />} />
          <Route path="car/:id" element={<ViewCar />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        {/* Owner Routes */}
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<AddCar />} />
          <Route path="your-listing" element={<OwnerAddedCarList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
