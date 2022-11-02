import React from "react";
import styles from "../style/productsContainer.module.css";

function ProductsContainer({ products, handleProductClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.productsContainer}>
        {products.map((product, index) => {
          return (
            <div className={styles.frame}>
              <div
                className={styles.imgBackground}
                key={index}
                onClick={() => {
                  handleProductClick(product);
                }}
              >
                <img
                  src={product.image}
                  className={styles.productImage}
                  alt={product.name}
                />
                <div>{product.name}</div>
              </div>
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
}

export default ProductsContainer;
