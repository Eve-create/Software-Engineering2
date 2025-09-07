import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CulturalContent from "../Components/CulturalContent";
import ProductList from "../Components/ProductList";
import Navbar from "../Components/Navbar";
import Donation from "../Components/Donation";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState(""); 

  const culturalRef = useRef(null);
  const donationRef = useRef(null);
  const productListRef = useRef(null); 

  useEffect(() => {
    axios
      .get("http://localhost:8081/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error("Error loading products:", err));

    const message = localStorage.getItem("welcomeMessage");
    if (message) {
      setWelcomeMessage(message);
      localStorage.removeItem("welcomeMessage");

      setTimeout(() => setWelcomeMessage(""), 3000);
    }
  }, []);

  const handleSearchResults = (results) => {
    setFilteredProducts(results.length > 0 ? results : []);
  };

  const scrollToCulturalContent = () => {
    if (culturalRef.current) {
      culturalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDonation = () => {
    if (donationRef.current) {
      donationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProducts = () => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* ✅ Welcome notification */}
      {welcomeMessage && (
        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {welcomeMessage}
        </div>
      )}
      <Navbar
        onSearchResults={handleSearchResults}
        onAboutClick={scrollToCulturalContent}
        onFundraisingClick={scrollToDonation}
        onShopClick={scrollToProducts}
        onSearchScroll={scrollToProducts} 
      />

      <div ref={culturalRef}>
        <CulturalContent />
      </div>

      <div ref={productListRef}>
        <ProductList products={filteredProducts} limit={true} />
      </div>

      <div ref={donationRef}>
        <Donation />
      </div>
    </div>
  );
};

export default Home;
