import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import SearchProduct from "../Components/SearchProduct";
import { LuUserRound, LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load all products at first
    axios.get("http://localhost:8081/products")
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.error("Error loading products:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); 
  };

  const handleSearchResults = (results) => {
    if (results.length > 0) {
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]); // empty if nothing found
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="nav-bar">
        <p>SHOPPER</p>
        <ul className="nav-menu">
          <li>About</li>
          <li>Online Fundraising</li>
          <li>Shop</li>
        </ul>

        <div className="searchProfileCart">
          <ul>
            <li>
              <SearchProduct onSearchResults={handleSearchResults} />
            </li>

            {/* User Icon with Dropdown */}
            <li className="user-menu">
              <LuUserRound
                size={30}
                className="user-icon"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </li>

            <li>
              <LuShoppingCart size={30} />
            </li>
          </ul>
        </div>
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p.id} className="product-card">
              <img src={`http://localhost:8081/uploads/${p.image}`} alt={p.name} />
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p>₱{p.price}</p>
            </div>
            
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
