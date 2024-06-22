import { NextFunction, Request, Response, Router } from "express";
import {
  createBook,
  getBookById,
  getBooks,
  searchBooks,
} from "../app/controllers/booksController";

const router = Router();

router.get("/books", getBooks);

router.get("/book/:id", getBookById);

// /addnew
router.post("/addnew", createBook);

// /search/:keyword
router.get("/search/:keyword", searchBooks);

export default router;
