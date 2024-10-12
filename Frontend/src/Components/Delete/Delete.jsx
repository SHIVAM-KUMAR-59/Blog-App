import { useState } from "react";
import styles from "./delete.module.css";
import Username from "../Login/Username";
import Password from "../Login/Password";
import ConfirmPassword from "../Profile/ConfirmPassword";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Delete = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onCancelClickHandler = () => {
    navigate("/profile");
  };
  console.log(username);
  const onDeleteClickHandler = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    try {
      axios
        .delete(`http://localhost:3000/api/users/${username}`, {
          data: { username, password }, // Pass username and password in the 'data' property
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className={styles.delete}>
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
            type="submit"
            className="btn btn-warning"
            onClick={onCancelClickHandler}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={onDeleteClickHandler}
          >
            Delete
          </button>
        </form>
      </div>
    </>
  );
};

export default Delete;
