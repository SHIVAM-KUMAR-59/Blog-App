import express from "express";
import { connectDB } from "./Config/configDB.mjs";
import routes from "./Router/main.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./Stratergy/local-stratergy.mjs";

// Connect to MongoDB
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser("secret"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 30, // Keep the cookie valid for 1 month
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// Home Page
app.get("/", (req, res) => {
  res.send("Hello World").status(200);
});

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
