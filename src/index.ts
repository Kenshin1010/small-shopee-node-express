import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

module.exports = app;
