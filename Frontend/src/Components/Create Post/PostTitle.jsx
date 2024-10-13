const PostTitle = ({ setTitle, title }) => {
  const onChangeHandler = (e) => {
    const value = e.target.value; // Get the current input value
    setTitle(value); // Update title state
  };
  return (
    <div className="mb-3">
      <label htmlFor="postTitle" className="form-label">
        Post Title
      </label>
      <input
        type="text"
        className="form-control"
        style={{ width: "40%" }}
        id="postTitle"
        placeholder="Enter the title for the post"
        required
        onChange={onChangeHandler}
        value={title} // Set the input value to the current title state
      />
    </div>
  );
};

export default PostTitle;
