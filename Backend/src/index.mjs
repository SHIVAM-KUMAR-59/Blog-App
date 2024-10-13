import express from "express";
import { connectDB } from "./Config/configDB.mjs";
import routes from "./Router/main.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./Stratergy/local-stratergy.mjs";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import Cors from "cors";

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
  Cors({
    origin: "http://localhost:5173", // Your frontend app URL
    credentials: true, // Enable sending cookies with CORS requests
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow common methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers
  })
);

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser("secret"));

// Session setup with MongoDB store
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 30, // 1 month expiration
      httpOnly: true, // Ensures the cookie is accessible only by the web server
      secure: process.env.NODE_ENV === "production", // Set secure cookies in production (HTTPS)
      sameSite: "Lax", // Prevents CSRF attacks while allowing cookies in cross-origin requests
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Use defined routes
app.use(routes);

// Home page
app.get("/", (req, res) => {
  res.send("Hello World").status(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
