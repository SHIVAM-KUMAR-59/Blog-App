import styles from "./card.module.css";

const Card = ({ title, shortDescription, author, tags }) => {
  return (
    <>
      <div className={styles.card}>
        <h2>{title}</h2>
        <h4>{author}</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio natus in
          quas voluptates harum architecto sit officiis ducimus aut eos quae
          laboriosam sunt officia, atque quos vel, quo facere eaque.
        </p>
        <p>
          Tags:
          {tags.map((tag) => (
            <button className={styles.tags}>{tag}</button>
          ))}
        </p>
        <button className={styles.readMore}>Read More...</button>
      </div>
    </>
  );
};
export default Card;
