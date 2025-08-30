import React from "react";
import '../Styles/ProductList.css'

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((p) => (
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
  );
}

export default ProductList;
