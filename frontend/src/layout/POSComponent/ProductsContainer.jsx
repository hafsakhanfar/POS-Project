import React from "react";

function ProductsContainer({ products, handleProductClick }) {
  return (
    <div className="productsContainer">
      {products.map((product, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              handleProductClick(product);
            }}
          >
            <figure>
              <img src={product.image} className="posProduct" alt={product.name} />
              <figcaption>{product.name}</figcaption>
            </figure>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsContainer;
