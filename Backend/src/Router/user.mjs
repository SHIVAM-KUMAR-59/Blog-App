// This File contains user routes such as get user by username, change the credentials of a user, delete a user
import { Router } from "express";
import { User } from "../Schema/userSchema.mjs";
import bcrypt from "bcrypt";
import { comparePassword } from "../utils/helpers.mjs";

const router = Router();

// Get a user by username
router.get("/api/users/:name", async (req, res) => {
  const { name } = req.params;

  // Check if the param username is string
  if (!isNaN(name)) {
    return res.status(401).send({ msg: "Invalid Username" });
  }

  const findUser = await User.findOne({ username: name });

  // If user is not found return error
  if (!findUser) {
    return res.status(401).send({ msg: "User Not Found" });
  }

  // Convert to plain object and omit id and password
  const { password, _id, ...userData } = findUser.toObject();

  res.status(200).send(userData); // Send the user back
});

// PATCH request to update a user's specific field
router.patch("/api/users/:name", async (req, res) => {
  // Ensure the user is logged in
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ message: "Not authenticated. Please log in." });
  }

  const { name } = req.params;
  const { password, fieldToUpdate, newValue } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username: name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
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

export default router;
