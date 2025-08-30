import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/DonationPayment.css";

function DonationPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { first_name, last_name, amount } = location.state || {};

  const [method, setMethod] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const handlePaymentMethod = (selectedMethod) => {
    setMethod(selectedMethod);
    setNumber("");
    setError("");
  };

  const handleDonate = async () => {
    // Validation
    if (method === "Credit/Debit Card" && number.length !== 16) {
      return setError("Invalid card. Must be 16 digits.");
    }
    if (method === "GCash" && number.length !== 11) {
      return setError("Invalid GCash number. Must be 11 digits.");
    }

    try {
      await axios.post("http://localhost:8081/donation", {
        first_name,
        last_name,
        amount,
        payment_method: method,
        number,
      });
      alert("✅ Donation successful!");
      navigate("/home"); 
    } catch (err) {
      console.error(err);
      alert("❌ Error saving donation.");
    }
  };

  return (
    <div className="donation-payment">
      <h2>Choose Payment Method</h2>
      <p>
        Donor: <b>{first_name} {last_name}</b>
      </p>
      <p>Amount: <b>₱{amount}</b></p>

      <div className="payment-options">
        <button onClick={() => handlePaymentMethod("Credit/Debit Card")}>
          Credit/Debit Card
        </button>
        <button onClick={() => handlePaymentMethod("GCash")}>
          GCash
        </button>
      </div>

      {method && (
        <div className="payment-input">
          <p>Enter your {method} number:</p>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder={method === "GCash" ? "Enter GCash number" : "Enter Card number"}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={handleDonate}>Donate</button>
        </div>
      )}
    </div>
  );
}

export default DonationPayment;
