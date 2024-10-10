import Router from "express";
import { Post } from "../Schema/postSchema.mjs";
import slugify from "slugify";
import { handleError, isAuthorized } from "../utils/helpers.mjs";
import { createPostValidationSchema } from "../Schema/validationSchema.mjs";
import { checkSchema, validationResult } from "express-validator";

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

// GET posts by partial slug match (case-insensitive)
router.get("/api/posts/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    // Use a regular expression to match any posts where the slug contains the given slug, case-insensitive
    const posts = await Post.find({
      slug: { $regex: slug, $options: "i" },
    })
      .populate("author", "-password -_id") // Exclude the password and _id fields from the author
      .select("-_id"); // exclude the post's _id

    // If no posts are found
    if (!posts.length) {
      return res
        .status(404)
        .json({ message: "No posts found with the given slug." });
    }

    res.status(200).json(posts); // Return the matched posts
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
        reactions: { likes: 0, comments: 0, shares: 0 },
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
