import { useNavigate } from "react-router";
import "./style.css";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../store/auth/authSelector";
import { API } from "../../helpers/requests";
import { PATH } from "../../helpers/constants";
import { useEffect } from "react";

export default function Logintocheckout({ car }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    console.log("Car data:", car);

    return () => {
      document.body.removeChild(script);
    };
  }, [car]);

  const onClick = () => {
    navigate("/login");
  };

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User not found, please login again");
      return;
    }

    const carPrice = car.price?.selling_price;
    if (!carPrice) {
      alert("Car price not available");
      return;
    }

    const { data } = await API.post(PATH.CREATE_ORDER, {
      amount: carPrice,
      userId: user._id,
      carId: car._id,
    });

    const options = {
      key: "rzp_test_oyVsBDn3ANTg4H",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: user.name,
      description: "Car Rental Payment",
      handler: function (response) {
        navigate("/order-success", {
          state: {
            orderId: data.dbOrderId,
            razorpayOrderId: data.orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            amount: data.amount / 100,
          },
        });
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.contact,
      },
      theme: { color: "#3399cc" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="Car-info">
      <div className="price-container">
        <div className="Price">
          <h5>Total Price</h5>
          <span id="uncrossed-price">₹{car.price?.selling_price}/hr</span>
        </div>
        <div className="rating-box">
          <p className="rating-box-p">4.5/5</p>
        </div>
      </div>

      {!isAuthenticated && (
        <button
          onClick={onClick}
          style={{
            width: "100%",
            backgroundColor: "black",
            marginTop: "15px",
            padding: "15px",
          }}
        >
          LogIn to Continue
        </button>
      )}

      {isAuthenticated && (
        <button
          onClick={handlePayment}
          style={{
            width: "100%",
            backgroundColor: "black",
            marginTop: "15px",
            padding: "15px",
          }}
        >
          Book Car
        </button>
      )}
    </div>
  );
}
