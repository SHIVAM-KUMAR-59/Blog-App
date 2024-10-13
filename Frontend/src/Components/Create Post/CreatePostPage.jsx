import { useState } from "react";
import PostTitle from "./PostTitle";
import PostDescription from "./PostDescription";
import PostContent from "./PostContent";
import TagsInput from "./TagsInput";
import CategoriesInput from "./CategoriesInput";
import styles from "./createpost.module.css";
import axios from "axios";

const CreatePostPage = () => {
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Form validation: Ensure that required fields are not empty
    if (
      !title ||
      !shortDescription ||
      !content ||
      tags.length === 0 ||
      category.length === 0
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const postData = {
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      content: content.trim(),
      tags,
      category,
    };

    // POST request
    axios
      .post("http://localhost:3000/api/posts", postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
        // Clear the input fields only after a successful API request
        setTitle("");
        setShortDescription("");
        setContent("");
        setTags([]);
        setCategories([]);
      })
      .catch((err) => {
        console.log("Error: ", err.response?.data || err.message);
      });
  };

  return (
    <form className={styles.createPostContainer} onSubmit={onSubmitHandler}>
      <PostTitle setTitle={setTitle} />
      <PostDescription setShortDescription={setShortDescription} />
      <PostContent setContent={setContent} />
      <TagsInput tags={tags} setTags={setTags} />
      <CategoriesInput categories={category} setCategories={setCategory} />
      <button className="btn btn-primary" type="submit">
        Create Post
      </button>
    </form>
  );
};

export default CreatePostPage;
