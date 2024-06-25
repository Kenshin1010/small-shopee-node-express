import mongoose, { Schema } from "mongoose";
import { IBook } from "../../types/response";

const bookSchema: Schema<IBook> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    isbn13: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserBook = mongoose.model<IBook>("UserBook", bookSchema);
