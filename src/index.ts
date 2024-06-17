import express from "express";

const app = express();

console.log("App is starting...");

app.get("/", (req, res) => {
  console.log("Received request on /");
  res.send("Hello, World!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});

module.exports = app;
