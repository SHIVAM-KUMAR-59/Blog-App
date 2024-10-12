import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ProfilePage from "../Components/Profile/ProfilePage";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState([]);
  const username = localStorage.getItem("username");
  useEffect(() => {
    try {
      const response = axios
        .get(`http://localhost:3000/api/users/${username}`)
        .then((response) => setData(response.data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Navbar />
      <ProfilePage data={data} />
    </>
  );
};

export default Profile;
