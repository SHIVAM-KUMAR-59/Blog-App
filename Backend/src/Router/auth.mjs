import express from "express";
import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { createUserValidationSchema } from "../Schema/validationSchema.mjs";
import {
  comparePassword,
  hashPassword,
  verifyPassword,
} from "../utils/helpers.mjs"; // Include verifyPassword for login
import { User } from "../Schema/userSchema.mjs";
import cookieParser from "cookie-parser"; // Import cookie-parser

const app = express();
const router = Router();

// Middleware
app.use(express.json()); // To parse JSON bodies

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

router.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const findUser = await User.findOne({ username });

  if (!findUser) {
    return res.status(401).send({ msg: "User Not Found" });
  }

  if (!comparePassword(password, findUser.password)) {
    return res.status(401).send({ msg: "Incorrect Password" });
  }

  req.session.user = findUser;
  return res.status(200).send(findUser);
});

router.post("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  });
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(400).send({ msg: "Not Authenticated" });
});

router.post("/api/auth/logout", (req, res) => {
  if (req.session.user === true) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(400);
  }
});

export default router;
