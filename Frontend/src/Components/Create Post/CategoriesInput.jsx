import { useState } from "react";

const CategoriesInput = ({ categories, setCategories }) => {
  const [categoryInput, setCategoryInput] = useState("");

  const handleAddCategory = () => {
    const newCategory = categoryInput.trim().toLowerCase();
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setCategoryInput(""); // Clear the input after adding
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(
      categories.filter((category) => category !== categoryToRemove)
    );
  };

  return (
    <div className="mb-3">
      <label htmlFor="categories" className="form-label">
        Categories
      </label>
      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          style={{ width: "40%" }}
          id="categoryInput"
          placeholder="Enter a category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>
      <div className="mt-2">
        {categories.map((category) => (
          <span key={category} className="badge bg-secondary me-2">
            {category}
            <button
              type="button"
              className="btn-close btn-close-white ms-2"
              aria-label="Close"
              onClick={() => handleRemoveCategory(category)}
            ></button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoriesInput;
