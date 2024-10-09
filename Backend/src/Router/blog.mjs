import { Router } from "express";
import { posts } from "../Constants/posts.mjs";

const router = Router();

// Get all posts
router.get("/api/posts", (req, res) => {
  res.status(200).send(posts);
});

// Delete a blog (only for logged-in users)
router.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  const postIndex = posts.findIndex((post) => post.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).send({ msg: "Post not found" });
  }

  const deletedPost = posts.splice(postIndex, 1);

  res.status(200).send({ msg: "Post deleted successfully", post: deletedPost });
});

// Modify a post by id (only for logged-in users)
router.put("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return res.status(404).send({ msg: "Post not found" });
  }

  const { title, shortDescription, content, tags } = req.body;

  if (title) posts[postIndex].title = title;
  if (content) posts[postIndex].content = content;
  if (shortDescription) posts[postIndex].shortDescription = shortDescription;
  if (tags) posts[postIndex].tags = tags;

  res
    .status(200)
    .send({ msg: "Post updated successfully", post: posts[postIndex] });
});

// Get Trending Posts (only for logged-in users)
router.get("/api/posts/trending", (req, res) => {
  const trendingPosts = posts
    .sort((a, b) => b.reactions.likes - a.reactions.likes)
    .slice(0, 10);

  res.status(200).send(trendingPosts);
});

// Get posts by title or tags (only for logged-in users)
router.get("/api/posts/:searchTerm", (req, res) => {
  const { searchTerm } = req.params;
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const matchedPosts = posts.filter((post) => {
    const postTitleMatch = post.title
      .toLowerCase()
      .includes(lowerCaseSearchTerm);
    const postTagsMatch = post.tags.some((tag) =>
      tag.toLowerCase().includes(lowerCaseSearchTerm)
    );

    return postTitleMatch || postTagsMatch;
  });

  if (matchedPosts.length === 0) {
    return res
      .status(404)
      .send({ msg: "No posts found matching the search term." });
  }

  res.status(200).send(matchedPosts);
});

export default router;
