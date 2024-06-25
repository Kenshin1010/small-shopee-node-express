import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBookByISBN13,
  getBooks,
  searchBooks,
  updateBook,
} from "../app/controllers/booksController";

const router = Router();

router.get("/books", getBooks);
// router.get("/user/books", getBooksByUser);

router.get("/:isbn13", getBookByISBN13);

// // /addnew by user
// router.post("/addnew/user", createBookByUser);

// /addnew
router.post("/addnew", createBook);

// /get update delete book by ID
router.get("/book/:_id", getBookById);
router.put("/book/:_id", updateBook);
router.delete("/book/:_id", deleteBook);

// /search/:keyword
router.get("/search/:keyword", searchBooks);

export default router;
