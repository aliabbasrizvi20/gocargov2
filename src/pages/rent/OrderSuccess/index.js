import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../../store/auth/authSelector";
import { API } from "../../../helpers/requests";
import { PATH } from "../../../helpers/constants";
import "./index.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderState = location.state;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!orderState || !orderState.orderId) {
          setError("No order information found");
          setLoading(false);
          return;
        }

        if (
          orderState.razorpayOrderId &&
          orderState.razorpayPaymentId &&
          orderState.razorpaySignature
        ) {
          const verifyResponse = await API.post(PATH.VERIFY_PAYMENT, {
            razorpay_order_id: orderState.razorpayOrderId,
            razorpay_payment_id: orderState.razorpayPaymentId,
            razorpay_signature: orderState.razorpaySignature,
          });

          if (verifyResponse.data.success) {
          }
        }

        const orderResponse = await API.get(
          `${PATH.GET_ORDER}/${orderState.orderId}`,
        );

        if (orderResponse.data) {
          setOrder(orderResponse.data);
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError(err.message || "Failed to fetch order details");

        setOrder({
          _id: orderState?.orderId,
          razorpayOrderId: orderState?.razorpayOrderId,
          amount: orderState?.amount,
          status: "pending",
          createdAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderState]);

  if (!isAuthenticated) {
    return (
      <div className="success-container">
        <div className="success-card">
          <p>Please log in to view your order details.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="success-container">
        <div className="success-card">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="success-container">
        <div className="success-card">
          <p className="error-message">Error: {error}</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const orderData = order || orderState || {};

  return (
    <>
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" className="checkmark-animation">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 12l3 3 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="success-title">Order Confirmed!</h1>
          <p className="success-subtitle">
            Your car rental booking has been successfully confirmed.
          </p>

          <div className="order-details">
            <div className="detail-item">
              <span className="detail-label">Order ID</span>
              <span className="detail-value">
                {orderData._id || orderData.razorpayOrderId || "N/A"}
              </span>
            </div>
            {orderData.razorpayOrderId && (
              <div className="detail-item">
                <span className="detail-label">Razorpay Order ID</span>
                <span className="detail-value">
                  {orderData.razorpayOrderId}
                </span>
              </div>
            )}
            <div className="detail-item">
              <span className="detail-label">Amount</span>
              <span className="detail-value price">
                ₹ {orderData.amount || 0}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span
                className={`detail-value status ${orderData.status || "pending"}`}
              >
                {(orderData.status || "pending").toUpperCase()}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date</span>
              <span className="detail-value">
                {orderData.createdAt
                  ? formatDate(orderData.createdAt)
                  : formatDate(new Date())}
              </span>
            </div>
          </div>

          <div className="confirmation-message">
            <p>
              A confirmation email has been sent to your registered email
              address.
              <br />
              Our team will contact you shortly with further details.
            </p>
          </div>

          <div className="action-buttons">
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>

          <div className="support-info">
            <p>
              Need help? Contact us at <strong>support@gocargo.com</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSuccess;
