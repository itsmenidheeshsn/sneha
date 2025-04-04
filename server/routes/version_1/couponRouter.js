import express from "express";
import {
  applyCoupon,
  createCoupon,
  getCoupon,
} from "../../controllers/couponController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../../middileware/authmiddileware.js";

const router = express.Router();

router.post("/create", authMiddleware, roleMiddleware("admin"), createCoupon);
router.post("/apply-coupon", authMiddleware, applyCoupon);
router.get("/get", authMiddleware, getCoupon);
export const couponRouter = router;
