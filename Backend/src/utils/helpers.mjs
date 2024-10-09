import bcrypt from "bcrypt";
import { User } from "../Schema/userSchema.mjs";
import { matchedData } from "express-validator";
import { Post } from "../Schema/postSchema.mjs";

const saltRounds = 10;

// Function to hash the password
export const hashPassword = (password) => {
  // Generate the salt
  const salt = bcrypt.genSaltSync(saltRounds);
  // console.log(salt);
  // Hash the password
  return bcrypt.hashSync(password, salt);
};

// Function to compare passwords
export const comparePassword = (plainPassword, hashedPassword) => {
  if (!plainPassword || !hashedPassword) {
    throw new Error("Both plain password and hashed password are required");
  }

  const isMatch = bcrypt.compareSync(plainPassword, hashedPassword);
  return isMatch;
};

// Helper function to check if user is authenticated and match username
export const checkAuthAndMatchUser = (req, res, name) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ message: "Not authenticated. Please log in." });
  }
  if (req.user.username !== name) {
    return res
      .status(403)
      .json({ message: "Forbidden: You can only modify your own account." });
  }
  return true; // Return true if authenticated and username matches
};

// Helper function to verify user password
export const verifyPassword = async (inputPassword, user) => {
  return await bcrypt.compare(inputPassword, user.password);
};

// Function to check if a user exists
export const checkUserExists = async (field, value) => {
  const existingUser = await User.findOne({ [field]: value });
  return existingUser !== null;
};

// Function to handle registration and login

export const handleAuth = async (req, res, next, type) => {
  try {
    const data = matchedData(req);
    const existingUser = await User.findOne({
      [type === "register" ? "username" : "username"]: data.username,
    });
    if (existingUser && type === "register") {
      return res.status(400).json({ message: "username already exists" });
    }

    if (!existingUser && type === "login") {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    if (type === "register") {
      data.password = await hashPassword(data.password);
      const newUser = new User(data);
      await newUser.save();
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ message: "Logged in successfully" });
      });
    } else if (type === "login") {
      const isValidPassword = await comparePasswords(
        data.password,
        existingUser.password
      );
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }
      req.login(existingUser, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ message: "Logged in successfully" });
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// Helper function to check if user is authenticated
export const isAuthenticated = (req, res) => {
  if (!req.isAuthenticated()) {
    return false;
  }
  return true; // Return true if authenticated
};

// Middleware to authenticate and authorize user
export const authenticateUser = async (req, res, next) => {
  if (!isAuthenticated(req, res)) return;
  const { name } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ username: name });
  if (!user || !(await verifyPassword(password, user))) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  req.user = user;
  next();
};

// Middleware to check if user is authorized to access own account
export const authorizeOwnAccount = (req, res, next) => {
  if (req.user.username !== req.params.name) {
    return res
      .status(403)
      .json({ message: "Forbidden: You can only access your own account." });
  }
  next();
};

// Function to find user by username
export const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

// Function to handle user deletion
export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ username: req.params.name });
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
};

// Function to handle post retrieval
export const getPostsByUser = async (req, res) => {
  try {
    const user = await findUserByUsername(req.params.username);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const posts = await Post.find({ author: user._id }).populate(
      "author",
      "username displayName"
    );
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to check if user is authorized to edit or delete a post
export const isAuthorized = async (req, res, next) => {
  const post = await Post.findOne({ title: req.params.title });
  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }
  if (!post.author.equals(req.user._id)) {
    return res
      .status(403)
      .json({ message: "You are not authorized to edit or delete this post." });
  }
  req.post = post;
  next();
};

// Function to handle errors
export const handleError = (res, error) => {
  console.error("Error:", error);
  return res
    .status(500)
    .json({ message: "Internal server error", error: error.message });
};
