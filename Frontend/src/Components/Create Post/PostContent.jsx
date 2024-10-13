const PostContent = ({ setContent }) => {
  const onChangeHandler = (e) => {
    const value = e.target.value; // Get the current input value
    setContent(value); // Update title state
  };
  return (
    <div className="mb-3">
      <label htmlFor="postContent" className="form-label">
        Post Content
      </label>
      <textarea
        className="form-control"
        style={{ width: "90%" }}
        id="postContent"
        placeholder="Enter the content for the post"
        rows={10}
        required
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default PostContent;
