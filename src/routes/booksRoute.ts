import { NextFunction, Request, Response, Router } from "express";
import {
  createBook,
  getBookById,
  getBooks,
} from "../app/controllers/booksController";

const router = Router();

router.get("/books", getBooks);

router.get("/:id", getBookById);

// /addnew
router.post("/addnew", createBook);

export default router;
