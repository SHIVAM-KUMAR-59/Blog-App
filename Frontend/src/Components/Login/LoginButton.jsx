import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const LoginButton = ({ title, route, display }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`${route}`);
  };
  return (
    <button
      onClick={onClickHandler}
      className={styles.signIn}
      style={{ display: display }}
    >
      {title}
    </button>
  );
};

export default LoginButton;
