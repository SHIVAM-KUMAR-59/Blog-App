import express from "express";
import blogRoutes from "./Router/blog.mjs";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(blogRoutes);

// Home Page
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Post request to create user
app.post("/api/user", (req, res) => {
  const { body } = req;
  res.sendStatus(200);
});

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
