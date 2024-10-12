import { Router } from "express";

import {
  authenticateUser,
  authorizeOwnAccount,
  deleteUser,
  findUserByUsername,
  getPostsByUser,
} from "../utils/helpers.mjs";

const router = Router();

// Routes
router.get("/api/users/:name", async (req, res) => {
  const user = await findUserByUsername(req.params.name);
  if (!user) {
    return res.status(404).send({ msg: "User Not Found" });
  }
  const { password, _id, ...userData } = user.toObject();
  res.status(200).send(userData);
});

router.patch("/api/users/:name", authenticateUser, async (req, res) => {
  const { fieldToUpdate, newValue } = req.body;
  if (fieldToUpdate && req.user[fieldToUpdate] !== undefined) {
    req.user[fieldToUpdate] = newValue;
    await req.user.save();
    return res
      .status(200)
      .json({ message: "Field updated successfully", user: req.user });
  } else {
    return res.status(400).json({ message: "Invalid field to update" });
  }
});

router.delete("/api/users/:name", deleteUser);

router.get("/api/users/:username/posts", getPostsByUser);

export default router;
