import Router from "express";
import { Post } from "../Schema/postSchema.mjs";
import slugify from "slugify";
import { handleError, isAuthorized } from "../utils/helpers.mjs";

const router = Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Not authenticated. Please log in." });
};

// GET request to retrieve all posts
router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    if (posts.length === 0) {
      return res.status(404).send({ msg: "No Posts Found" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    handleError(res, error);
  }
});

// POST request to create a new post
router.post("/api/posts", isAuthenticated, async (req, res) => {
  try {
    const { title, shortDescription, content, image } = req.body;
    if (!title || !shortDescription || !content) {
      return res.status(400).json({
        message: "Title, short description, and content are required.",
      });
    }
    const slug = slugify(title, { lower: true, strict: true });
    const newPost = new Post({
      title,
      shortDescription,
      content,
      image,
      slug,
      author: req.user._id,
    });
    await newPost.save();
    return res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    handleError(res, error);
  }
});

// PATCH request to update a post by title
router.patch(
  "/api/posts/title/:title",
  isAuthenticated,
  isAuthorized,
  async (req, res) => {
    try {
      const { shortDescription, content, image } = req.body;
      if (shortDescription) req.post.shortDescription = shortDescription;
      if (content) req.post.content = content;
      if (image) req.post.image = image;
      await req.post.save();
      return res
        .status(200)
        .json({ message: "Post updated successfully.", post: req.post });
    } catch (error) {
      handleError(res, error);
    }
  }
);

// DELETE request to remove a post by title
router.delete(
  "/api/posts/:title",
  isAuthenticated,
  isAuthorized,
  async (req, res) => {
    try {
      await req.post.deleteOne();
      return res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
      handleError(res, error);
    }
  }
);

export default router;
