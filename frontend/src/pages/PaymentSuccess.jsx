// src/pages/PaymentSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="success-container">
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase. Your order is being processed.</p>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default PaymentSuccess;