import express from "express";
import path from "path";

const app = express();

app.use(express.json());
// Serve the React static files after build
// app.use(express.static("../client/build"));
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

// All other unmatched requests will return the React app
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

export default app;