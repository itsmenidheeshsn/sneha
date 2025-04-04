import { Coupon } from "../models/couponModel.js";
import { User } from "../models/userModel.js";
import { Cart } from "../models/cartModel.js";
export async function createCoupon(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const {
      code,
      discountPercentage,
      minOrderVal,
      MaxDiscValue,
      expiryDate,
      isAvailable,
      t,
    } = req.body;
    if (
      !code ||
      !discountPercentage ||
      !minOrderVal ||
      !MaxDiscValue ||
      !expiryDate
    ) {
      return res.status(401).json({ message: "All Fields Are Required" });
    }

    const couponExist = await Coupon.findOne({ code: code });
    if (couponExist) {
      return res.status(400).json({ message: "Code Already Exists" });
    }
    const [day, month, year] = expiryDate.split("/");
    const formattedExpiryDate = new Date(`${year}-${month}-${day}`);

    if (isNaN(formattedExpiryDate.getTime())) {
      return res.status(400).json({ message: "Invalid Expiry Date Format" });
    }

    const newCoupon = new Coupon({
      code,
      discountPercentage,
      minOrderVal,
      MaxDiscValue,
      expiryDate: formattedExpiryDate,
      isAvailable,
    });

    await newCoupon.save();
    res
      .status(201)
      .json({ message: "New Coupon is Added Successfully", newCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCoupon(req, res) {
  try {
    const coupon = await Coupon.find();
    if (coupon.lengths === 0) {
      return res.status(404).json({ message: "no coupon found " });
    }
    return res.status(200).json({ message: "fetched all coupon ", coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function applyCoupon(req, res) {
  try {
    const { code, cartId } = req.body;

    if (!code || !cartId) {
      return res
        .status(400)
        .json({ message: "Coupon code and cart ID are required" });
    }

    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (!coupon.isAvailable) {
      return res.status(400).json({ message: "Coupon is not available" });
    }

    const currentDate = new Date();
    if (new Date(coupon.expiryDate) < currentDate) {
      return res.status(400).json({ message: "Coupon has expired" });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const orderValue = cart.totalPrice;

    if (orderValue < coupon.minOrderVal) {
      return res.status(400).json({
        message: `Order value must be at least ₹${coupon.minOrderVal} to use this coupon`,
      });
    }

    const discount = Math.min(
      (orderValue * coupon.discountPercentage) / 100,
      coupon.MaxDiscValue
    );

    const finalPrice = orderValue - discount;

    return res.status(200).json({
      message: "Coupon applied successfully",
      orderValue,
      discount,
      finalPrice,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
