import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const LoginButton = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/login");
  };
  return (
    <button onClick={onClickHandler} className={styles.signIn}>
      Login
    </button>
  );
};

export default LoginButton;
