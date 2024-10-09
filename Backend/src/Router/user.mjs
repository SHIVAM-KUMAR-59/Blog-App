import { Router } from "express";
import { User } from "../Schema/userSchema.mjs";
import bcrypt from "bcrypt";
import { Post } from "../Schema/postSchema.mjs";

const router = Router();

// Helper function to check if user is authenticated
const isAuthenticated = (req, res) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ message: "Not authenticated. Please log in." });
  }
  return true; // Return true if authenticated
};

// Helper function to verify user password
const verifyPassword = async (inputPassword, user) => {
  return await bcrypt.compare(inputPassword, user.password);
};

// Get a user by username
router.get("/api/users/:name", async (req, res) => {
  const { name } = req.params;

  // Check if the param username is a string
  if (!isNaN(name)) {
    return res.status(400).send({ msg: "Invalid Username" });
  }

  const findUser = await User.findOne({ username: name });

  // If user is not found, return error
  if (!findUser) {
    return res.status(404).send({ msg: "User Not Found" });
  }

  // Convert to plain object and omit id and password
  const { password, _id, ...userData } = findUser.toObject();
  res.status(200).send(userData); // Send the user back
});

// PATCH request to update a user's specific field
router.patch("/api/users/:name", async (req, res) => {
  if (!isAuthenticated(req, res)) return;

  const { name } = req.params;
  const { password, fieldToUpdate, newValue } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username: name });

    if (!user || !(await verifyPassword(password, user))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Update the specified field
    if (fieldToUpdate && user[fieldToUpdate] !== undefined) {
      user[fieldToUpdate] = newValue;
      await user.save();
      return res
        .status(200)
        .json({ message: "Field updated successfully", user });
    } else {
      return res.status(400).json({ message: "Invalid field to update" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

// DELETE request to remove a user by username
router.delete("/api/users/:name", async (req, res) => {
  const { name } = req.params;
  const { password } = req.body; // Assuming password is sent in the body

  if (!isAuthenticated(req, res)) return;

  // Verify that the username matches the logged-in user's username
  if (req.user.username !== name) {
    return res
      .status(403)
      .json({ message: "Forbidden: You can only delete your own account." });
  }

  try {
    // Find the logged-in user
    const user = await User.findOne({ username: name });

    if (!user || !(await verifyPassword(password, user))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Delete the user from the database
    await User.deleteOne({ username: name });

    // Log the user out and destroy the session
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out." });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Error destroying session." });
        }
        return res.status(200).json({
          message: "User account deleted and logged out successfully.",
        });
      });
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// GET request to get all posts by a specific user
router.get("/api/users/:username/posts", async (req, res) => {
  const { username } = req.params;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find all posts created by this user
    const posts = await Post.find({ author: user._id }).populate(
      "author",
      "username displayName"
    ); // Optionally populate author details

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
