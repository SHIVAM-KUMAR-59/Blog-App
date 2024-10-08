import express from "express";
import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { createUserValidationSchema } from "../Schema/validationSchema.mjs";
import { hashPassword, verifyPassword } from "../utils/helpers.mjs"; // Include verifyPassword for login
import { User } from "../Schema/userSchema.mjs";
import cookieParser from "cookie-parser"; // Import cookie-parser

const app = express();
const router = Router();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cookieParser()); // Use cookie-parser middleware

// Register a new User
router.post(
  "/api/auth/register",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);

    // Check if a user with the same username exists already
    const alreadyPresentUsername = await User.findOne({
      username: data.username,
    });
    if (alreadyPresentUsername) {
      return res.status(400).json({ errors: ["username already exists"] });
    }

    // Check if a user with the same email exists already
    const alreadyPresentEmail = await User.findOne({
      email: data.email,
    });
    if (alreadyPresentEmail) {
      return res
        .status(400)
        .json({ errors: ["user with this email already exists"] });
    }

    // Hash the password before saving
    data.password = hashPassword(data.password);
    const newUser = new User(data);
    console.log(newUser);
    try {
      await newUser.save(); // Use await to wait for user to save
      return res.sendStatus(201); // Return 201 for successful creation
    } catch (error) {
      console.error(error);
      return res.sendStatus(500); // Internal server error
    }
  }
);

export default router;
