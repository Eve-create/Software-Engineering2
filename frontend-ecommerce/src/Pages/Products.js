import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../Components/ProductList"; 
import Navbar from "../Components/Navbar";

function Products() {
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
    setFilteredProducts(results.length > 0 ? results : []);
  };

  

  return (
    <div>
      <Navbar onSearchResults={handleSearchResults} />
      <ProductList products={filteredProducts} limit={false} />
    </div>
  );
}

export default Products;
