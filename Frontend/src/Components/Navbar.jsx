import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginButton from "../Components/Login/LoginButton";

const Navbar = () => {
  const value = useRef("");
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:3000/api/auth/status/${username}`, {
          withCredentials: true,
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  }, [username]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const postTitle = value.current.value.trim();

    if (postTitle) {
      axios
        .get(`http://localhost:3000/api/posts/${postTitle}`)
        .then((response) => {
          console.log("Fetched Data:", response.data);
          if (response.data.length > 0) {
            navigate(`/post/${postTitle}`);
          } else {
            console.log("Post not found");
            // Handle post not found scenario
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          // Handle error scenario
        });
    }

    value.current.value = "";
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Blogstagram
        </a>
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
          <LoginButton title={"Profile"} route="/profile" />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
