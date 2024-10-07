import express from "express";
import { posts } from "./Constants/posts.mjs";

const app = express();

const PORT = process.env.PORT || 3000;

// Home Page
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Get all posts
app.get("/api/posts", (req, res) => {
  res.status(200).send(posts);
});

// Get posts by id
app.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const parseId = parseInt(id);

  // If the Parsed Id is not a number
  if (isNaN(parseId)) {
    res.status(404).send({ msg: "Invalid Id" });
  }

  const findPostIndex = posts.findIndex((post) => post.id === parseId);

  // If index not found
  if (findPostIndex === -1) {
    return res.status(404).send({ msg: "Post Not Found" });
  }

  req.findPostIndex = findPostIndex;

  // If post not found
  const post = posts[findPostIndex];
  if (!post) {
    return res.status(404).send({ msg: "Post Not Found" });
  }

  // Return the post
  return res.status(200).send(post);
});

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
