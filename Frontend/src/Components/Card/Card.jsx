import styles from "./card.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Card = ({ title, shortDescription, author, tags }) => {
  const navigate = useNavigate();
  const onClickFunction = (e) => {
    e.preventDefault();
    navigate(`/post/${title}`);
  };
  return (
    <>
      <div className={styles.card}>
        <h2>{title}</h2>
        <h4>{author}</h4>
        <p>{shortDescription}</p>
        <p>
          Tags:
          {tags.map((tag) => (
            <button className={styles.tags}>{tag}</button>
          ))}
        </p>
        <Button onClickHandler={onClickFunction} />
      </div>
    </>
  );
};
export default Card;
