import Password from "../Login/Password";
import Username from "../Login/Username";
import ConfirmPassword from "../Profile/ConfirmPassword";
import { useNavigate } from "react-router-dom";
import styles from "./logout.module.css";
import { useState } from "react";
import axios from "axios";

const LogoutPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onCancelClickHandler = () => {
    navigate("/profile");
  };

  const onSignoutClickHandler = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    // Signout the user
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/logout`,
        {
          username,
          password,
        },
        {
          withCredentials: true, // Ensures that cookies are sent with the request
        }
      );

      if (response.status === 200) {
        // Successfully logged out, delete the localStorage and navigate to home page
        localStorage.removeItem("username");
        navigate("/");
      } else {
        console.log("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <>
      <div className={styles.logout}>
        <form>
          <Username
            heading="Username"
            value={username}
            setValue={setUsername}
          />
          <Password
            value={password}
            setValue={setPassword}
            heading="Password"
          />
          <ConfirmPassword password={password} />
          <button
            type="button"
            className="btn btn-warning"
            onClick={onCancelClickHandler}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={onSignoutClickHandler}
          >
            Signout
          </button>
        </form>
      </div>
    </>
  );
};

export default LogoutPage;
