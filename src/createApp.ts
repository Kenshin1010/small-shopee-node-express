import express, { NextFunction, Request, Response } from "express";
import bookRouter from "./routes/booksRoute";
import cors from "cors";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  console.log("App is starting...");

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  app.get("/", (req, res) => {
    return res.status(234).send("Store Books API");
  });

  app.use("/", bookRouter);

  return app;
}
