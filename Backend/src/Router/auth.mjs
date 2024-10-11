import { Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { createUserValidationSchema } from "../Schema/validationSchema.mjs";
import {
  checkUserExists,
  comparePassword,
  handleAuth,
} from "../utils/helpers.mjs";
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

    const usernameExists = await checkUserExists("username", req.body.username);
    const emailExists = await checkUserExists("email", req.body.email);

    if (usernameExists) {
      return res.status(400).json({ errors: ["username already exists"] });
    }

    if (emailExists) {
      return res.status(400).json({ errors: ["email already exists"] });
    }

    handleAuth(req, res, next, "register");
  }
);

// Login
router.post("/api/auth/login", async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ errors: ["Invalid username or password"] });
  }
  const isValidPassword = comparePassword(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ errors: ["Invalid username or password"] });
  }
  req.login(user, (err) => {
    if (err) {
      return next(err);
    }
    // On successful login, send a success response
    return res.status(200).json({ message: "Logged in successfully" });
  });
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
