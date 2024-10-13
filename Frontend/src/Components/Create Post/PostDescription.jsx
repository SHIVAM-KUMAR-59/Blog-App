const PostDescription = ({ setShortDescription }) => {
  const onChangeHandler = (e) => {
    const value = e.target.value; // Get the current input value
    setShortDescription(value); // Update title state
  };

  return (
    <div className="mb-3">
      <label htmlFor="postDescription" className="form-label">
        Post Description
      </label>
      <textarea
        className="form-control"
        style={{ width: "70%", height: "100px" }}
        id="postDescription"
        placeholder="Enter the description for the post"
        required
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default PostDescription;
