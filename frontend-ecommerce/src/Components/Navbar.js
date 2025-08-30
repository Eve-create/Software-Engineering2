import React, { useState } from "react";
import { LuUserRound, LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import SearchProduct from "./SearchProduct";
import "../Styles/Navbar.css";

const Navbar = ({ onSearchResults }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="nav-bar">
      <p>LLERAMART</p>
      <ul className="nav-menu">
        <li>About</li>
        <li>Online Fundraising</li>
        <li>Shop</li>
      </ul>

      <div className="searchProfileCart">
        <ul>
          <li>
            <SearchProduct onSearchResults={onSearchResults} />
          </li>

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
  );
};

export default Navbar;
