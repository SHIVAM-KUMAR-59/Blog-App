import { Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { delete_and_Logout_UserValidationSchema } from "../Schema/validationSchema.mjs";
import { User } from "../Schema/userSchema.mjs";
// import { checkUserLoggedIn } from "../utils/helpers.mjs";

const router = Router();

// Get user by username
router.get("/api/users/:username", async (req, res) => {
  const { username } = req.params;
  if (!isNaN(username)) {
    return res.status(400).json({ errors: "Invalid username" });
  }
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// Delete a user by username
router.delete(
  "/api/users/:username",
  checkSchema(delete_and_Logout_UserValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      const user = await User.findOneAndDelete({
        username: req.params.username,
      });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

export default router;
