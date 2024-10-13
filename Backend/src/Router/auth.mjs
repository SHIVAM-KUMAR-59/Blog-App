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
router.post("/api/auth/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ errors: [info.message] });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res
        .status(200)
        .json({ message: "Logged in successfully", user: user });
    });
  })(req, res, next);
});

// Helper middleware to check if the user is logged in or not
router.get("/api/auth/status/:username", (req, res) => {
  const { username } = req.params;

  // Check if the user is authenticated and the username matches
  if (req.isAuthenticated() && req.user && req.user.username === username) {
    return res.status(200).send({ msg: "Authenticated", user: req.user });
  } else {
    return res
      .status(401)
      .send({ msg: "Not Authenticated or Username mismatch" });
  }
});

// Logout
router.post("/api/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

export default router;
