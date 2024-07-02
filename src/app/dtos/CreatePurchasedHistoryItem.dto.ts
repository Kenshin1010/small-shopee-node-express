import { IPurchasedItem } from "../../types/response";

export interface CreatePurchasedHistoryItemDto {
  orderName: string;
  orderData: {
    cartProductItems: IPurchasedItem[];
    orderTime: string;
  };
}
