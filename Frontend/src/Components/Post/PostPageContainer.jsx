import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./post.module.css";

const PostPageContainer = () => {
  const { title } = useParams(); // Get the title parameter from the URL

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/${title}`)
      .then((response) => {
        console.log("Fetched Data:", response.data); // Log the response data to check its structure
        // Since the response is an array, access the first element
        setData(response.data[0]); // Set data to the first object in the response array
      })
      .catch((err) => {
        console.error("Error fetching data:", err); // Log any errors
        setError(err);
        setData(null); // Reset data on error
      });
  }, [title]); // Run only once on component mount or when title changes

  if (error) {
    return <div>Error: {error.message}</div>; // Handle error
  }

  // Check if data is available before rendering
  if (!data) {
    return <div>Loading...</div>; // Loading state if no data yet
  }

  return (
    <div className={styles.postPageContainer}>
      <h1>{data.title.trim()}</h1>
      <h3>Author: {data.author.displayName}</h3>
      <h5>
        Published Date: {new Date(data.publishedDate).toLocaleDateString()}
      </h5>
      <hr />
      <p>
        Decription: <br />
        {data.shortDescription}
      </p>
      <hr />
      <p>{data.content}</p>
      <p>Likes: {data.reactions.like}</p>
      <p>Comments:{data.comments}</p>
    </div>
  );
};

export default PostPageContainer;
