import React from "react";

const Email = ({ value, setValue }) => {
  return (
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Email address
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Please Enter a valid email address"
        required
        value={value} // Bind input value to state
        onChange={(e) => setValue(e.target.value)} // Update state on change
      />
      <div id="emailHelp" className="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>
  );
};

export default Email;
