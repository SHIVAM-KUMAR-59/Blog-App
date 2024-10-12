import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginButton from "../Components/Login/LoginButton";

const Navbar = () => {
  const value = useRef("");
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const postTitle = value.current.value.trim(); // Trim whitespace

    if (postTitle) {
      axios
        .get(`http://localhost:3000/api/posts/${postTitle}`)
        .then((response) => {
          console.log("Fetched Data:", response.data); // Log the response data to check its structure

          // Check if the response data is an array and has elements
          if (response.data.length > 0) {
            navigate(`/post/${postTitle}`); // Navigate only if the post exists
          } else {
            console.log("Post not found");
            // You can also handle a scenario where no post is found, e.g., show an alert
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err); // Log any errors
          // Optionally handle the error here, e.g., show an alert
        });
    }

    value.current.value = ""; // Clear the input field
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Blogstagram</a>
        <form className="d-flex" role="search" onSubmit={onSubmitHandler}>
          <input
            className="form-control me-2"
            type="search"
            ref={value}
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
          <LoginButton title={"Login"} route="/login" />
          <LoginButton title={"Register"} route="/register" />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
