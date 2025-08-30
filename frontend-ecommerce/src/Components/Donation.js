import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Donation.css";

function Donation() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    amount: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/donation-payment", { state: formData });
  };

  return (
    <div className="donation">
      <p>Fundraising</p>
      <div className="donation-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Donation Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <button type="submit">Donate</button>
        </form>
      </div>
      <div className="donation-history-btn">
        <button onClick={() => navigate("/donation-history")}>
          Donation History
        </button>
      </div>
    </div>
  );
}

export default Donation;
