import Router from "express";
import { Post } from "../Schema/postSchema.mjs";
import slugify from "slugify";
import { handleError, isAuthorized } from "../utils/helpers.mjs";
import { createPostValidationSchema } from "../Schema/validationSchema.mjs";
import { checkSchema, validationResult } from "express-validator";
import { User } from "../Schema/userSchema.mjs";

const router = Router();

// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
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

// GET request to retrieve posts by author username
router.get("/api/posts/author/:username", async (req, res) => {
  try {
    // Find the user by username
    const user = await User.findOne({ username: req.params.username });

    // If user not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all posts by the user's ID
    const posts = await Post.find({ author: user._id });

    // Return the found posts
    res.status(200).json(posts);
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET posts by partial slug match (case-insensitive) and exact slug match
router.get("/api/posts/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    // Use a regular expression to match any posts where the slug contains the given slug
    const posts = await Post.find({
      $or: [
        { slug: { $regex: slug, $options: "i" } }, // Match partial slug
        { slug: slug }, // Match exact slug
        { title: { $regex: slug, $options: "i" } }, // Match title (case-insensitive)
      ],
    })
      .populate("author", "-password -_id") // Exclude the password and _id fields from the author
      .select("-_id"); // Exclude the post's _id

    // Attach posts to request object for later use
    req.posts = posts;

    // If no posts are found, call next middleware with an error
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found." });
    }
    res.status(200).send(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// GET post by title
router.get("/api/posts/:title", async (req, res) => {
  const title = req.params.title;
  if (!isNaN(title)) {
    return res.status(400).json({ message: "Invalid title" });
  }

  const post = await Post.findOne({ title });
  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }

  return res.status(200).send(post);
});

// POST request to create a new post
router.post(
  "/api/posts",
  isAuthenticated,
  checkSchema(createPostValidationSchema),
  async (req, res) => {
    try {
      const { title, shortDescription, content, image, tags, category } =
        req.body;

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      const slug = slugify(title, { lower: true });
      const newPost = new Post({
        title,
        slug,
        shortDescription,
        content,
        image,
        tags,
        category,
        author: req.user._id,
      });
      await newPost.save();
      return res
        .status(201)
        .json({ message: "Post created successfully.", post: newPost });
    } catch (err) {
      handleError(res, err);
    }
  }
);

// PATCH request to update a post by title
router.patch(
  "/api/posts/:title",
  isAuthenticated,
  isAuthorized,
  async (req, res) => {
    try {
      const { title, shortDescription, content, image, tags, category } =
        req.body;
      const currentTitle = req.params.title;

      // Find the post by the current title
      const post = await Post.findOne({ title: currentTitle });
      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }

      // Update the fields if provided
      if (title) {
        post.title = title;
        post.slug = slugify(title, { lower: true, strict: true }); // Update slug based on new title
      }
      if (shortDescription) post.shortDescription = shortDescription;
      if (content) post.content = content;
      if (image) post.image = image;
      if (tags) post.tags = tags;
      if (category) post.category = category;

      // Save the updated post
      await post.save();

      return res
        .status(200)
        .json({ message: "Post updated successfully.", post });
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
