const PostDescription = ({ setShortDescription, shortDescription }) => {
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
        value={shortDescription} // Set the input value to the current description state
      />
    </div>
  );
};

export default PostDescription;
