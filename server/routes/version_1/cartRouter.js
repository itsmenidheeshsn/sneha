import express from "express";
import {
  addQuantity,
  addToCart,
  deleteCartItem,
  getCart,
  removeSingleItemFromCart,
} from "../../controllers/cartController.js";
import { authMiddleware } from "../../middileware/authmiddileware.js";
const router = express.Router();

router.post("/item", authMiddleware, addToCart);
router.delete("/remove/:foodId", authMiddleware, deleteCartItem);
router.put("/update", authMiddleware, addQuantity);
router.get("/all", authMiddleware, getCart);
// router.delete("/remove/item/:foodId", authMiddleware, removeSingleItemFromCart);
export const cartRouter = router;
