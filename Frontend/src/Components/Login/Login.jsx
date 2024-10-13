import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import Password from "./Password";
import Username from "./Username";
import Header from "./Header";
import Email from "./Email";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setName }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      await axios.post("http://localhost:3000/api/auth/login", {
        username,
        email,
        password,
      });
      // Set the local host username to this username
      localStorage.setItem("username", username);
      navigate("/");
    } catch (error) {
      console.log(error);
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
        <Password value={password} setValue={setPassword} heading="Password" />
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
