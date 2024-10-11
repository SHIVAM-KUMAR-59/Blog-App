import { useRef } from "react";

const Navbar = () => {
  const value = useRef("");
  const onSubmitHandler = (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log(value.current.value); // Log the input value
    console.log("Form submitted");
    value.current.value = "";
  };

  return (
    <>
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
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
