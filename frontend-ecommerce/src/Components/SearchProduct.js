import React, { useState } from 'react';
import '../Styles/SearchProduct.css';
import { LuSearch } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const SearchProduct = ({ onSearchResults, onClose, showClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const performSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const res = await axios.get(`http://localhost:8081/search?q=${searchQuery}`);
        onSearchResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
        alert("Something went wrong while searching.");
      }
    } else {
      alert("Please enter something to search.");
    }
  };

  const handleInputChange = (e) => setSearchQuery(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") performSearch();
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
      <LuSearch size={28} className="search-icon" onClick={performSearch} />
      {showClose && (
        <IoClose
          size={30}
          className="close-icon"
          onClick={onClose}
        />
      )}
    </div>
  );
};

export default SearchProduct;
