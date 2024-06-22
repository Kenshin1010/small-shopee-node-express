import { Request, Response } from "express-serve-static-core";
import { CreateBookDto } from "../dtos/CreateBook.dto";
import { CreateBookQueryParams } from "../../types/query-params";
import { IBook } from "../../types/response";
import { Book } from "../models/bookModel";
import mongoose, { FilterQuery } from "mongoose";

interface ErrorResponse {
  message: string;
}

interface SearchParams {
  keyword: string;
}

export async function getBooks(
  request: Request<{}, {}, {}, CreateBookQueryParams>,
  response: Response<{ count: number; books: IBook[] } | ErrorResponse>
) {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      books: books,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
}

export async function getBookById(
  request: Request<{ _id: string }, {}, {}, CreateBookQueryParams>,
  response: Response<IBook | ErrorResponse>
) {
  try {
    const { _id } = request.params;

    const book = await Book.findById(_id);

    if (!book) {
      return response.status(404).send({ message: "Book not found" });
    }

    return response.status(200).json(book);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
}

export async function createBook(
  request: Request<{}, {}, CreateBookDto, CreateBookQueryParams>,
  response: Response<IBook | ErrorResponse>
) {
  try {
    if (
      !request.body.title ||
      !request.body.subtitle ||
      !request.body.isbn13 ||
      !request.body.price ||
      !request.body.image ||
      !request.body.url
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, subtitle, isbn13",
      });
    }
    const newBook = {
      title: request.body.title,
      subtitle: request.body.subtitle,
      isbn13: request.body.isbn13,
      price: request.body.price,
      image: request.body.image,
      url: request.body.url,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
}

export async function searchBooks(
  request: Request<SearchParams>,
  response: Response<{ count: number; books: IBook[] } | ErrorResponse>
) {
  try {
    const { keyword } = request.params;

    const searchCriteria: FilterQuery<IBook> = {};

    if (keyword) {
      const regex = new RegExp(String(keyword), "i");
      searchCriteria.$or = [
        { title: { $regex: regex } },
        { subtitle: { $regex: regex } },
        { price: { $regex: regex } },
        { image: { $regex: regex } },
        { url: { $regex: regex } },
        { isbn13: isNaN(Number(keyword)) ? undefined : Number(keyword) },
      ].filter(Boolean);

      if (mongoose.Types.ObjectId.isValid(keyword)) {
        searchCriteria.$or.push({ _id: new mongoose.Types.ObjectId(keyword) });
      }
    }

    const books = await Book.find(searchCriteria);

    return response.status(200).json({
      count: books.length,
      books: books,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
}
