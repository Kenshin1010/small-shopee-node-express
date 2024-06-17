import express from "express";

const app = express();

app.get("/");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
