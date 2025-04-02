import { Restaurant } from "../models/restaurantModel.js";
import { User } from "../models/userModel.js";

export const verifyRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.isVerified = true;
    await restaurant.save();

    res.status(200).json({ message: "Restaurant verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "not user found" });
    }
    res.status(404).json({ message: "Fetched all users successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
