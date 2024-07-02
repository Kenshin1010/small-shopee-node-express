import mongoose, { Schema } from "mongoose";
import { ICartItemSave } from "../../types/response";

const cartItemSaveSchema: Schema<ICartItemSave> = new Schema(
  {
    product: {
      _id: String,
      quantity: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const CartItemSave = mongoose.model<ICartItemSave>(
  "CartItemSave",
  cartItemSaveSchema
);
