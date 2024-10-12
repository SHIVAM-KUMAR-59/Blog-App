import "./App.css";
import Landing from "./Pages/Landing";
import PostPage from "./Pages/PostPage";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route from react-router-dom
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/post/:title" element={<PostPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
