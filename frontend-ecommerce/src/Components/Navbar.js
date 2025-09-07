import React, { useState } from "react";
import { LuUserRound, LuShoppingCart, LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import SearchProduct from "./SearchProduct";
import "../Styles/Navbar.css";

const Navbar = ({ onSearchResults, onAboutClick, onFundraisingClick, onShopClick, onSearchScroll }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="nav-bar">
      {!showSearch ? (
        <>
          <p className="go-home" onClick={goHome}>LLERAMART</p>
          <ul className="nav-menu">
            <li onClick={onAboutClick}>About</li>
            <li onClick={onShopClick}>Shop</li> 
            <li onClick={onFundraisingClick}>Fundraising</li>
          </ul>

          <div className="searchProfileCart">
            <ul>
              <li>
                <LuSearch
                  size={30}
                  className="search-toggle-icon"
                  onClick={() => setShowSearch(true)}
                />
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
        </>
      ) : (
        <SearchProduct
          onSearchResults={onSearchResults}
          onClose={() => setShowSearch(false)}
          showClose={true}
          onSearchScroll={onSearchScroll}   
        />
      )}
    </div>
  );
};

export default Navbar;
