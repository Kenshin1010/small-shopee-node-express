import { Router } from "express";
import {
  createPurchasedHistoryItem,
  deletePurchasedHistoryItem,
  getPurchasedHistoryItemById,
  getPurchasedHistoryItems,
} from "../app/controllers/purchasedHistoryItemsController";

const router = Router();

router.get("/purchased-history-items", getPurchasedHistoryItems);

// /create-purchased-history-item
router.post("/create-purchased-history-item", createPurchasedHistoryItem);

// /get delete purchased history item by ID
router.get("/purchased-history-item/:_id", getPurchasedHistoryItemById);
router.delete("/purchased-history-item/:_id", deletePurchasedHistoryItem);

export default router;
