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
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);

    try {
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
      data.password = await hashPassword(data.password);
      const newUser = new User(data);
      await newUser.save();

      // Authenticate the user immediately after registration
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(201).send({ msg: "User registered and logged in" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
);

// Login
router.post("/api/auth/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Logged in successfully" });
    });
  })(req, res, next);
});

// Helper middleware to check if the user is logged in or not
router.get("/api/auth/status", (req, res) => {
  return req.isAuthenticated()
    ? res.status(200).send({ msg: "Authenticated" })
    : res.status(401).send({ msg: "Not Authenticated" });
});

// Logout
router.post("/api/auth/logout", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    // Check if the user is authenticated
    if (!user) {
      return res
        .status(401)
        .json({ message: info.message || "Authentication failed" });
    }

    // If the user is authenticated, log them out
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  })(req, res, next);
});

export default router;
