import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {
  createUserValidationSchema,
  deleteUserValidationSchema,
} from "../Schema/validationSchema.mjs";
import { hashPassword } from "../utils/helpers.mjs";
import { User } from "../Schema/userSchema.mjs";

const router = Router();

// Create a new user
router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);
    data.password = hashPassword(data.password);
    const newUser = new User(data);

    try {
      const saveUser = newUser.save();
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(400);
    }
  }
);

// Delete a user by username
router.delete(
  "/api/users/:username",
  checkSchema(deleteUserValidationSchema),
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
