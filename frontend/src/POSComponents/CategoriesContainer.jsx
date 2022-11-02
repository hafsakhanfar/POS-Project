import React from "react";
import styles from "../style/categoriesContainer.module.css";
function CategoriesContainer({ categories, setFilterValue }) {
  const handleCategoryClick = (name) => {
    setFilterValue(name);
  };
  return (
    <div className={styles.container}>
      <button className={styles.categoryBox} onClick={() => setFilterValue("")}>
        All
      </button>
      {categories.map((category, index) => {
        return (
          <button
            className={styles.categoryBox}
            key={index}
            onClick={() => {
              handleCategoryClick(category.name);
            }}
          >
            <p>{category.name}</p>
          </button>
        );
      })}
    </div>
  );
}

export default CategoriesContainer;
