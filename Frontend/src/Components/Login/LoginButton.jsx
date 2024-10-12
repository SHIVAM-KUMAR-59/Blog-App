import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const LoginButton = ({ title, route }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`${route}`);
  };
  return (
    <button onClick={onClickHandler} className={styles.signIn}>
      {title}
    </button>
  );
};

export default LoginButton;
