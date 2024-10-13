import { useState } from "react";

const TagsInput = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    const newTag = tagInput.trim().toLowerCase();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput(""); // Clear the input after adding
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mb-3">
      <label htmlFor="tags" className="form-label">
        Tags
      </label>
      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          style={{ width: "40%" }}
          id="tagInput"
          placeholder="Enter a tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddTag}
        >
          Add Tag
        </button>
      </div>
      <div className="mt-2">
        {tags.map((tag) => (
          <span key={tag} className="badge bg-secondary me-2">
            {tag}
            <button
              type="button"
              className="btn-close btn-close-white ms-2"
              aria-label="Close"
              onClick={() => handleRemoveTag(tag)}
            ></button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
