import { Router } from "express";
import {
  createCartItem,
  createCartItemSave,
  deleteCartItem,
  getCartItemById,
  getCartItems,
  getCartItemsSave,
  updateCartItem,
} from "../app/controllers/cartItemsController";

const router = Router();

router.get("/cart-items-save", getCartItemsSave);
router.get("/cart-items", getCartItems);
// router.get("/user/cartItems", getCartItemsByUser);

// // /addnew by user
// router.post("/addnew/user", createCartItemByUser);

// /addnew-cart-item
router.post("/addnew-cart-item", createCartItemSave);

// /create-cart-item
router.post("/create-cart-item", createCartItem);

// /get update delete cartItem by ID
router.get("/cart-item/:_id", getCartItemById);
router.patch("/cart-item/:_id", updateCartItem);
router.delete("/cart-item/:_id", deleteCartItem);

export default router;
