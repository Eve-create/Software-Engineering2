import React, { useState, useEffect } from "react";
import axios from "axios";
import CulturalContent from "../Components/CulturalContent";
import ProductList from "../Components/ProductList";
import Navbar from "../Components/Navbar";
import Donation from "../Components/Donation";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Load products initially
  useEffect(() => {
    axios.get("http://localhost:8081/products")
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.error("Error loading products:", err));
  }, []);

  const handleSearchResults = (results) => {
    if (results.length > 0) {
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <div>
      <Navbar onSearchResults={handleSearchResults} />
      <CulturalContent/>
      <ProductList products={filteredProducts} />
      <Donation/>
    </div>
  );
};

export default Home;
