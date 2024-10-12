import styles from "./card.module.css";
const Button = ({ onClickHandler }) => {
  return (
    <>
      <button className={styles.readMore} onClick={onClickHandler}>
        Read More...
      </button>
    </>
  );
};

export default Button;
