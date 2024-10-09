// This File contains user routes such as get user by username, change the credentials of a user, delete a user
import { Router } from "express";
import { User } from "../Schema/userSchema.mjs";

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

export default router;
