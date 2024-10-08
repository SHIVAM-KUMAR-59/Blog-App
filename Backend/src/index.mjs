import express from "express";
import blogRoutes from "./Router/blog.mjs";
import { connectDB } from "./Config/configDB.mjs";

// Connect to MongoDB
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(blogRoutes);

// Home Page
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
