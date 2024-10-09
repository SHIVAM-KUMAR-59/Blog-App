import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {
  createUserValidationSchema,
  delete_and_Logout_UserValidationSchema,
} from "../Schema/validationSchema.mjs";
import { comparePassword, hashPassword } from "../utils/helpers.mjs";
import { User } from "../Schema/userSchema.mjs";
import passport from "passport";
import "../Stratergy/local-stratergy.mjs";

const router = Router();

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
    try {
      await newUser.save(); // Use await to wait for user to save

      // Authenticate the user immediately after registration
      req.login(newUser, (err) => {
        if (err) {
          return next(err); // Pass the error to the error handler
        }
        return res.status(201).send({ msg: "User registered and logged in" });
      });
    } catch (error) {
      console.error(error);
      return res.sendStatus(500); // Internal server error
    }
  }
);

// Login
router.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
});

// Helper middleware to check if the user is logged in or not ( won't be in production )
router.post("/api/auth/status", (req, res) => {
  return req.user
    ? res.status(200).send({ msg: "Authenticated" })
    : res.status(400).send({ msg: "Not Authenticated" });
});

router.post(
  "/api/auth/logout",
  checkSchema(delete_and_Logout_UserValidationSchema),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ msg: "Invalid username" });
    }

    if (!comparePassword(password, user.password)) {
      return res.status(400).send({ msg: "Incorrect password" });
    }

    if (req.user) {
      req.logout((err) => {
        if (err) {
          return res.sendStatus(400);
        }
        res.status(200).send({ msg: "Logged out Successfully" });
      });
    } else {
      return res.status(401).send({ msg: "User not logged in" });
    }
  }
);

export default router;
