const Card = ({ title, shortDescription, author, category }) => {
  return (
    <>
      <div className="card">
        <h2>{title}</h2>
        <h4>{author}</h4>
        <p>{shortDescription}</p>
        <p>{category}</p>
      </div>
    </>
  );
};
export default Card;
