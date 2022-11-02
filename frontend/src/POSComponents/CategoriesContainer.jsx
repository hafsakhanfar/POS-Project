import React from "react";

function CategoriesContainer({ categories, setFilterValue }) {
  const handleCategoryClick = (name) => {
    setFilterValue(name);
  };
  return (
    <div className="categoriesContainer">
      {categories.map((category, index) => {
        return (
          <div
            className="categoryBox"
            key={index}
            onClick={() => {
              handleCategoryClick(category.name);
            }}
          >
            <p>{category.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CategoriesContainer;
