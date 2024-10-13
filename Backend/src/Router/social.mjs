import { Router } from "express";
import { Post } from "../Schema/postSchema.mjs";
import { isAuthenticated } from "./blog.mjs";
import { Comment } from "../Schema/commentSchema.mjs";

const router = Router();

// PATCH request to Like a post
router.patch("/api/posts/:title/like", isAuthenticated, async (req, res) => {
  const { title } = req.params;
  const { value } = req.body; // Get value (0 or 1) from the request body

  try {
    // Find the post by title (slug)
    const post = await Post.findOne({ title });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Update the number of likes based on value
    if (value === "0") {
      post.reactions.like += 1; // Increment like
    } else if (value === "1") {
      post.reactions.like -= 1; // Decrement like (user removed like)
    }

    // Save the post after updating likes
    await post.save();

    res.status(200).json({ message: "Likes updated successfully.", post });
  } catch (error) {
    console.error("Error updating likes:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// POST request to create a new comment
router.post("/api/posts/:title/comments", isAuthenticated, async (req, res) => {
  const { title } = req.params;

  // Check if title is a valid string
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ message: "Invalid title" });
  }

  const { content } = req.body;

  // Check if content is provided
  if (!content || typeof content !== "string" || content.trim() === "") {
    return res.status(400).json({ message: "Comment content cannot be empty" });
  }

  try {
    // Find the post by title
    const post = await Post.findOne({ title });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Create a new comment
    const comment = new Comment({
      content,
      post: post._id,
      author: req.user._id,
    });

    // Save the comment
    await comment.save();

    // Add the comment to the post
    post.comments.push(comment._id);

    // Save the post
    await post.save();

    return res
      .status(201)
      .json({ message: "Comment created successfully.", comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export default router;
