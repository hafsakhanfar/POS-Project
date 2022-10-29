import React from "react";

function ProductsContainer({ products }) {
  return (
    <div className="productsContainer">
      {products.map((product, index) => {
        return (
          <div key={index}>
            <figure>
              <img src={product.image} className="posProduct" />
              <figcaption>{product.name}</figcaption>
            </figure>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsContainer;
