import React from "react";

const Username = ({ value, setValue }) => {
  return (
    <div className="mb-3">
      <label htmlFor="username" className="form-label">
        Username
      </label>
      <input
        type="text"
        className="form-control"
        id="username"
        aria-describedby="emailHelp"
        placeholder="Username must be between 3-20 characters"
        required
        value={value} // Bind input value to state
        onChange={(e) => setValue(e.target.value)} // Update state on change
      />
    </div>
  );
};

export default Username;
