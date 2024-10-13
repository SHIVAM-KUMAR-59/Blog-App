import "./App.css";
import Landing from "./Pages/Landing";
import PostPage from "./Pages/PostPage";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import ProfileDelete from "./Pages/ProfileDelete";
import Logout from "./Pages/Logout";
import CreatePost from "./Pages/CreatePost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/post/:title" element={<PostPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/delete" element={<ProfileDelete />} />
        <Route path="/profile/logout" element={<Logout />} />
        <Route path="/profile/create-post" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
