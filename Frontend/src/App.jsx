import "./App.css";
import Landing from "./Pages/Landing";
import PostPage from "./Pages/PostPage";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route from react-router-dom
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/post/:title" element={<PostPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
