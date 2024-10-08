import express from "express";
import { connectDB } from "./Config/configDB.mjs";
import routes from "./Router/main.mjs";

// Connect to MongoDB
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

// Home Page
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
