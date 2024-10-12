import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./profile.module.css";

const Hero = ({ data }) => {
  const { username } = data;
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/author/${username}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [data.username]);

  return (
    <div className={styles.hero}>
      {Array.isArray(posts) && posts.length > 0 ? ( // Check if data is an array and not empty
        posts.map((post) => (
          <Card
            key={post.title}
            title={post.title}
            shortDescription={post.shortDescription}
            author={post.author.username}
            tags={post.tags}
          />
        ))
      ) : (
        <div>No Posts Found</div>
      )}
    </div>
  );
};

export default Hero;
