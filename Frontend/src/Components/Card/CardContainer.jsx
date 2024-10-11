import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const CardContainer = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts/")
      .then((response) => {
        console.log("Fetched Data:", response.data); // Log the response data to check its structure
        setData(response.data); // Set data to the response array
      })
      .catch((err) => {
        console.error("Error fetching data:", err); // Log any errors
        setError(err);
        setData([]); // Reset data on error
      });
  }, []); // Run only once on component mount

  if (error) {
    return <div>Error: {error.message}</div>; // Handle error
  }

  return (
    <>
      {Array.isArray(data) && data.length > 0 ? ( // Check if data is an array and not empty
        data.map((post) => (
          <Card
            key={post.title} // Add a unique key for each Card
            title={post.title}
            shortDescription={post.shortDescription}
            author={post.author.username}
            category={post.category}
          />
        ))
      ) : (
        <div>Loading...</div> // Loading state if no data yet
      )}
    </>
  );
};

export default CardContainer;
