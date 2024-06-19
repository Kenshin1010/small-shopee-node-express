import express from "express";
import mongoose from "mongoose";
import { mongoDBURL, PORT } from "./config";

const app = express();
app.use(express.json());

console.log("App is starting...");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Store Books API");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
