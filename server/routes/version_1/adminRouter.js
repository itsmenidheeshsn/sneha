import express from "express";
import {
  getProfile,
  getRole,
  login,
  logout,
  profileUpdate,
  signUp,
} from "../../controllers/authContoller.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../../middileware/authmiddileware.js";
import {
  getAllUsers,
  verifyRestaurant,
} from "../../controllers/adminController.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", authMiddleware, roleMiddleware("admin"), logout);
router.get("get/users", authMiddleware, roleMiddleware("admin"), getAllUsers);
router.post("/signup", signUp);
router.get("/profile", authMiddleware, getProfile);
router.get("/profile", authMiddleware, getProfile);
router.put("/update", authMiddleware, profileUpdate);
router.get("/profile/role", authMiddleware, getRole);
router.put("/verify/:restaurantId", verifyRestaurant);

export const adminRouter = router;
