import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/ProductList.css";

function ProductList({ products, limit = true }) {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/products");
  };

  const displayedProducts = limit ? products.slice(0, 4) : products;

  return (
    <div className="products">
      <p>{limit ? "Featured Products" : "All Products"}</p>
      <div className={`product-list ${limit ? "featured-products" : ""}`}>
        {displayedProducts.length > 0 ? (
          displayedProducts.map((p) => (
            <div key={p.id} className="product-card">
              <img
                src={`http://localhost:8081/uploads/${p.image}`}
                alt={p.name}
              />
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p>₱{p.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {limit && (
        <div className="view-all-products">
          <button onClick={handleViewAll}>View All</button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
