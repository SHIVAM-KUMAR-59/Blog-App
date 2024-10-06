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

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
