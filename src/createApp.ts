import express, { NextFunction, Request, Response } from "express";
import path from "path";
import bookRouter from "./routes/booksRoute";
import uploadRouter from "./routes/uploadRoute";
import cartItemRouter from "./routes/cartItemsRoute";
import purchasedHistoryItemRouter from "./routes/purchasedHistoryItemsRoute";
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

  app.use(express.static(path.join(__dirname, "public")));

  app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "favicon.ico"));
  });

  app.get("/", (req, res) => {
    return res.status(234).send("Store Books API");
  });

  // router setup
  app.use("/", bookRouter);
  app.use("/purchased", purchasedHistoryItemRouter);
  app.use("/upload", uploadRouter);
  app.use("/cart", cartItemRouter);

  return app;
}
