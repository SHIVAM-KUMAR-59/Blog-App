import Navbar from "./Components/Navbar";
import "./App.css";
import Landing from "./Pages/Landing";
import PostPage from "./Pages/PostPage";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route from react-router-dom

function App() {
  return (
    <>
      <Navbar /> {/* Navbar always displayed */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/post/:title" element={<PostPage />} />
        {/* Define more routes here if necessary */}
      </Routes>
    </>
  );
}

export default App;
