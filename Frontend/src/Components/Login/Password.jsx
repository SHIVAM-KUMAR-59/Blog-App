import React, { useState } from "react";

const Password = ({ value, setValue, heading }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value; // Get the current input value
    setValue(newPassword); // Update state with the new password

    // Validate password length
    if (newPassword.length < 8) {
      setErrorMessage("Password must contain at least 8 characters");
    } else {
      setErrorMessage(""); // Clear error message if valid
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        {heading}
      </label>
      <input
        type="password"
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Password must contain at least 8 characters"
        required
        value={value} // Bind input value to state
        onChange={handlePasswordChange} // Call the handler on change
      />
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
};

export default Password;
