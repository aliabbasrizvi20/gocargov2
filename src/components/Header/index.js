import "./Header.css";
import car from "../../assets/car.svg";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../store/auth/authSelector";
import { logoutUser } from "../../store/auth/authAction";
import Button from "../Button";

function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout() {
    dispatch(logoutUser());
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src={car} className="site-icon" alt="Site Icon" />
          <span className="brand-text" style={{ color: "black" }}>
            GoDrive
          </span>
        </Link>

        <div className="d-flex align-items-center gap-3">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link to="/owner" className="nav-link host-vehicle-btn">
                Host A Vehicle
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/owner/your-listing"
                className="nav-link view-listing-btn"
              >
                View Your Listing
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-lg-auto align-items-center">
            {!isAuthenticated ? (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="btn btn-primary btn-sm login-btn"
                  style={{ background: "cadetblue" }}
                >
                  Log In
                </Link>
              </li>
            ) : (
              <li className="nav-item d-flex align-items-center gap-2">
                <span
                  className="user-badge"
                  style={{ backgroundColor: "black" }}
                >
                  Hi, {user?.name || "User"}
                </span>
                <button
                  onClick={onLogout}
                  className="btn btn-outline-light btn-sm logout-btn"
                  style={{ background: "rgb(15, 158, 111)" }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
