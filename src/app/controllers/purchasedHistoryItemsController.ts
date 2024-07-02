import { Request, Response } from "express-serve-static-core";
import { CreatePurchasedQueryParams } from "../../types/query-params";
import { IPurchasedHistoryItem } from "../../types/response";
import { CreatePurchasedHistoryItemDto } from "../dtos/CreatePurchasedHistoryItem.dto";
import { PurchasedHistoryItem } from "../models/purchasedHistoryItemModel";

interface ErrorResponse {
  message: string;
}

export async function getPurchasedHistoryItems(
  request: Request<{}, {}, {}, CreatePurchasedQueryParams>,
  response: Response<
    | { count: number; purchasedHistoryItems: IPurchasedHistoryItem[] }
    | ErrorResponse
  >
) {
  try {
    const purchasedHistoryItems = await PurchasedHistoryItem.find()
      .sort({ updatedAt: -1 })
      .exec();
    return response.status(200).json({
      count: purchasedHistoryItems.length,
      purchasedHistoryItems: purchasedHistoryItems,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
}

export async function getPurchasedHistoryItemById(
  request: Request<{ _id: string }, {}, {}, CreatePurchasedQueryParams>,
  response: Response<IPurchasedHistoryItem | ErrorResponse>
) {
  try {
    const { _id } = request.params;

    const purchasedHistoryItem = await PurchasedHistoryItem.findById(_id);

    if (!purchasedHistoryItem) {
      return response
        .status(404)
        .send({ message: "Purchased history item not found" });
    }

    return response.status(200).json(purchasedHistoryItem);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
}

export async function createPurchasedHistoryItem(
  request: Request<
    {},
    {},
    CreatePurchasedHistoryItemDto,
    CreatePurchasedQueryParams
  >,
  response: Response<IPurchasedHistoryItem | ErrorResponse>
) {
  try {
    const { orderName, orderData } = request.body;

    if (!orderName || !orderData) {
      return response.status(400).send({
        message: "Send all required fields: orderName, orderData",
      });
    }

    const newPurchasedHistoryItem = {
      orderName,
      orderData,
    };

    const purchasedHistoryItem = await PurchasedHistoryItem.create(
      newPurchasedHistoryItem
    );

    return response.status(201).send(purchasedHistoryItem);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
}

export async function deletePurchasedHistoryItem(
  request: Request<{ _id: string }, {}, {}, CreatePurchasedQueryParams>,
  response: Response<IPurchasedHistoryItem | ErrorResponse>
) {
  try {
    const { _id } = request.params;

    const purchasedHistoryItem = await PurchasedHistoryItem.findByIdAndDelete(
      _id
    );

    if (!purchasedHistoryItem) {
      return response
        .status(404)
        .send({ message: "Purchased history item not found" });
    }

    return response
      .status(200)
      .send({ message: "Purchased history item deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
}
