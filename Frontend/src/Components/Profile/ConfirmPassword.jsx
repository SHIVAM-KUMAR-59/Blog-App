import { useState } from "react";

const ConfirmPassword = ({ password }) => {
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    const value = e.target.value; // Get the current input value
    setConfirm(value); // Update confirm state

    // Compare the input value with the password prop
    if (value !== password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Enter your Password"
          onChange={onChangeHandler}
          value={confirm}
        />
        {error && <p className="text-danger">{error}</p>}
      </div>
    </>
  );
};

export default ConfirmPassword;
