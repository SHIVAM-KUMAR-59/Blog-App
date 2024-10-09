import Router from "express";
import { Post } from "../Schema/postSchema.mjs";
import slugify from "slugify";

const router = Router();

// GET request to retrieve all posts
router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username"); // Optionally populate author data
    if (posts.length === 0) {
      return res.status(404).send({ msg: "No Posts Found" });
    }
    return res.status(200).json(posts); // Send the posts back as a response
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Post request to create a post
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware
  }
  return res.status(401).json({ message: "Not authenticated. Please log in." });
};

// POST request to create a new post
router.post("/api/posts", isAuthenticated, async (req, res) => {
  const { title, shortDescription, content, image } = req.body;

  // Validate required fields
  if (!title || !shortDescription || !content) {
    return res
      .status(400)
      .json({ message: "Title, short description, and content are required." });
  }

  try {
    // Generate a unique slug based on the title
    const slug = slugify(title, { lower: true, strict: true });

    // Create a new post
    const newPost = new Post({
      title,
      shortDescription,
      content,
      image,
      slug,
      author: req.user._id, // Assuming req.user contains the authenticated user information
    });

    // Save the post to the database
    await newPost.save();
    return res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH request to update a post by title
router.patch("/api/posts/title/:title", async (req, res) => {
  const { title } = req.params;
  const { shortDescription, content, image } = req.body;

  // Ensure the user is logged in
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ message: "Not authenticated. Please log in." });
  }

  try {
    // Find the post by title
    const post = await Post.findOne({ title });

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the logged-in user is the author of the post
    if (!post.author.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this post." });
    }

    // Update the post fields if provided
    if (shortDescription) post.shortDescription = shortDescription;
    if (content) post.content = content;
    if (image) post.image = image;

    // Save the updated post
    await post.save();

    return res
      .status(200)
      .json({ message: "Post updated successfully.", post });
  } catch (error) {
    console.error("Error updating post:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// DELETE request to remove a post by title
router.delete("/api/posts/:title", async (req, res) => {
  const { title } = req.params;

  // Ensure the user is logged in
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ message: "Not authenticated. Please log in." });
  }

  try {
    // Find the post by title
    const post = await Post.findOne({ title });

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the logged-in user is the author of the post
    if (!post.author.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post." });
    }

    // Delete the post
    await post.deleteOne();

    return res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export default router;
