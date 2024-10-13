import { useState } from "react";
import Email from "../Login/Email";
import styles from "../Login/login.module.css";
import Password from "../Login/Password";
import Header from "../Login/Header";
import Username from "../Login/Username";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          displayName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // Store the username in local storage
        localStorage.setItem("username", username);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage("Username or email already exists");
      } else {
        setErrorMessage("An error occurred while registering");
      }
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Header title={"Register"} />
          <Username
            value={username}
            setValue={setUsername}
            heading={"Username"}
          />
          <Username
            value={displayName}
            setValue={setDisplayName}
            heading={"Display Name"}
          />
          <Email value={email} setValue={setEmail} />
          <Password value={password} setValue={setPassword} />
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
