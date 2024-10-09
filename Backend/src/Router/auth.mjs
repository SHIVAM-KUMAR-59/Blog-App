import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { createUserValidationSchema } from "../Schema/validationSchema.mjs";
import { hashPassword } from "../utils/helpers.mjs"; // Include verifyPassword for login
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
    // req.session.visited = true;
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

router.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
});

router.post("/api/auth/status", (req, res) => {
  console.log("Inside Status Endpoint");
  console.log(req.user);
  console.log(req.session);
  return req.user
    ? res.status(200).send(req.user)
    : res.status(400).send({ msg: "Not Authenticated" });
});

router.post("/api/auth/logout", (req, res) => {
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
});

export default router;
