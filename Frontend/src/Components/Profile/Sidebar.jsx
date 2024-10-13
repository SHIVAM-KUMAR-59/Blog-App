import styles from "./profile.module.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ data }) => {
  const navigate = useNavigate();
  const OnDeleteClickHandler = () => {
    navigate("/profile/delete");
  };

  const onCreatePostClickHandler = () => {
    navigate("/profile/create-post");
  };

  const onSignoutClickHandler = () => {
    navigate("/profile/logout");
  };

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary ${styles.sidebar}`}
      style={{ width: "280px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <svg className="bi pe-none me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4">My Profile</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a
            href="#"
            className="nav-link link-body-emphasis"
            aria-current="page"
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#home"></use>
            </svg>
            {data.username}
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-body-emphasis">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#speedometer2"></use>
            </svg>
            {data.displayName}
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-body-emphasis">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#table"></use>
            </svg>
            {data.email}
          </a>
        </li>
        <li>
          <a
            href="#"
            className="nav-link link-body-emphasis"
            onClick={onCreatePostClickHandler}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#grid"></use>
            </svg>
            Create Post
          </a>
        </li>
        <li>
          <a
            href="#"
            className="nav-link link-body-emphasis"
            onClick={onSignoutClickHandler}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#people-circle"></use>
            </svg>
            Signout
          </a>
        </li>
      </ul>
      <hr />
      <button className="btn btn-danger" onClick={OnDeleteClickHandler}>
        Delete Account
      </button>
    </div>
  );
};

export default Sidebar;
