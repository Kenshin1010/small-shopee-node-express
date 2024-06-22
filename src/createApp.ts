import express, { NextFunction, Request, Response } from "express";
import bookRouter from "./routes/booksRoute";
import uploadRouter from "./routes/uploadRouter";
import cors from "cors";
import bodyParser from "body-parser";

export function createApp() {
  // initialization
  const app = express();

  // middleware parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: "10mb" }));

  app.use(cors());

  console.log("App is starting...");

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  app.get("/", (req, res) => {
    return res.status(234).send("Store Books API");
  });

  // router setup
  app.use("/", bookRouter);
  app.use("/upload", uploadRouter);

  return app;
}
