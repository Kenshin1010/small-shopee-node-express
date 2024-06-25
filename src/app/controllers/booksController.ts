import { Request, Response } from "express-serve-static-core";
import mongoose, { FilterQuery } from "mongoose";
import { CreateBookQueryParams } from "../../types/query-params";
import { IBook } from "../../types/response";
import { CreateBookDto } from "../dtos/CreateBook.dto";
import { Book } from "../models/bookModel";

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
    const books = await Book.find().sort({ updatedAt: -1 }).exec();
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

// export async function getBooksByUser(
//   request: Request<{}, {}, {}, CreateBookQueryParams>,
//   response: Response<{ count: number; userBooks: IBook[] } | ErrorResponse>
// ) {
//   try {
// const userBooks = await UserBook.find().sort({ updatedAt: -1 }).exec();
//     return response.status(200).json({
//       count: userBooks.length,
//       userBooks: userBooks,
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.log(error.message);
//       response.status(500).send({ message: error.message });
//     }
//   }
// }

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

export async function getBookByISBN13(
  request: Request<{ isbn13: string }, {}, {}, CreateBookQueryParams>,
  response: Response<IBook | ErrorResponse>
) {
  try {
    const { isbn13 } = request.params;

    const book = await Book.findOne({ isbn13 });

    if (!book) {
      // return response.status(404).send({ message: "Book not found" });
      return response.status(204).send();
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
    const { title, isbn13, price, image, url = "" } = request.body;

    if (!title || !isbn13 || !price || !image || !url) {
      return response.status(400).send({
        message: "Send all required fields: title, isbn13, price, image, url",
      });
    }

    const existingIsbn13 = await Book.findOne({ isbn13 });

    if (existingIsbn13) {
      return response
        .status(400)
        .send({ message: "Book with this ISBN13 already exists" });
    }

    const newBook = {
      title,
      subtitle: request.body.subtitle || "",
      isbn13,
      price,
      image,
      url,
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

// export async function createBookByUser(
//   request: Request<{}, {}, CreateBookDto, CreateBookQueryParams>,
//   response: Response<IBook | ErrorResponse>
// ) {
//   try {
//     if (
//       !request.body.title ||
//       !request.body.isbn13 ||
//       !request.body.price ||
//       !request.body.image ||
//       !request.body.url
//     ) {
//       return response.status(400).send({
//         message: "Send all required fields: title, isbn13, price, image, url",
//       });
//     }
//     const newBookByUser = {
//       title: request.body.title,
//       subtitle: request.body.subtitle || "",
//       isbn13: request.body.isbn13,
//       price: request.body.price,
//       image: request.body.image,
//       url: request.body.url,
//     };

//     const userBook = await Book.create(newBookByUser);

//     return response.status(201).send(userBook);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message);
//       response.status(500).send({ message: error.message });
//     }
//   }
// }

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

export async function deleteBook(
  request: Request<{ _id: string }, {}, {}, CreateBookQueryParams>,
  response: Response<IBook | ErrorResponse>
) {
  try {
    const { _id } = request.params;

    const book = await Book.findByIdAndDelete(_id);

    if (!book) {
      return response.status(404).send({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
}

export async function updateBook(
  request: Request<{ _id: string }, {}, CreateBookDto, CreateBookQueryParams>,
  response: Response<IBook | ErrorResponse>
) {
  try {
    const { title, isbn13, price, image, url } = request.body;

    if (!title || !isbn13 || !price || !image || !url) {
      return response.status(400).send({
        message: "Send all required fields: title, isbn13, price, image, url",
      });
    }

    const { _id } = request.params;

    // Find the current book by _id
    const currentBook = await Book.findById(_id);

    if (!currentBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    // If the isbn13 is being updated, check if another book already has this isbn13
    if (isbn13 !== currentBook.isbn13) {
      const existingIsbn13 = await Book.findOne({ isbn13 });

      if (existingIsbn13) {
        return response
          .status(400)
          .send({ message: "Book with this ISBN13 already exists" });
      }
    }

    const updateBook = {
      title,
      subtitle: request.body.subtitle || "",
      isbn13,
      price,
      image,
      url,
    };

    const result = await Book.findByIdAndUpdate(_id, updateBook, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
}
