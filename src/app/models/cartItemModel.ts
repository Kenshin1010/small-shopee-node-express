import mongoose, { Schema } from "mongoose";
import { ICartItem } from "../../types/response";

const cartItemSchema: Schema<ICartItem> = new Schema(
  {
    product: {
      _id: String,
      isbn13: Number,
      title: String,
      price: String,
      image: String,
      quantity: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const CartItem = mongoose.model<ICartItem>("CartItem", cartItemSchema);
