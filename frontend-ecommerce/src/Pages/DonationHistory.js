import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/DonationHistory.css";

function DonationHistory() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/donation")
      .then((res) => {
        console.log("Fetched donations:", res.data);
        setDonations(res.data);
      })
      .catch((err) => console.error("Error fetching donations:", err));
  }, []);

  return (
    <div className="donation-history">
      <h2>Donation History</h2>
      {donations.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        <div className="donation-list">
          {donations.map((donation, index) => (
            <div key={index} className="donation-card">
              <p><b>Donor:</b> {donation.first_name} {donation.last_name}</p>
              <p><b>Amount:</b> ₱{donation.amount}</p>
              <p><b>Date:</b> {new Date(donation.donation_date || donation.date).toLocaleString()}</p>
              <p><b>Payment Method:</b> {donation.payment_method}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DonationHistory;
