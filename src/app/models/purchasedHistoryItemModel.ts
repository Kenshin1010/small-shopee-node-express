import mongoose, { Schema } from "mongoose";
import { IPurchasedHistoryItem } from "../../types/response";

const purchasedHistoryItemSchema: Schema<IPurchasedHistoryItem> = new Schema(
  {
    orderName: String,
    orderData: {
      cartProductItems: Array,
      orderTime: String,
    },
  },
  {
    timestamps: true,
  }
);

export const PurchasedHistoryItem = mongoose.model<IPurchasedHistoryItem>(
  "PurchasedHistoryItem",
  purchasedHistoryItemSchema
);
