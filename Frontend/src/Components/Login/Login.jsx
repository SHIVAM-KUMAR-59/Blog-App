import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import Password from "./Password";
import Username from "./Username";
import Header from "./Header";
import Email from "./Email";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          email,
          password,
        }
      );
      // Handle success response
      console.log("Signup successful:", response.data);
      navigate("/");
    } catch (error) {
      // Handle error response
      setErrorMessage(
        error.response?.data?.message || "Signup failed, Please Try Again"
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Header title={"Login"} />
        <Username
          value={username}
          setValue={setUsername}
          heading={"Username"}
        />
        <Email value={email} setValue={setEmail} />
        <Password value={password} setValue={setPassword} />
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
