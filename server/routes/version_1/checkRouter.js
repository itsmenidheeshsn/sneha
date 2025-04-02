import express from "express";
import {
  authMiddleware,
  roleMiddleware,
} from "../../middileware/authmiddileware.js";
import { checkUser } from "../../controllers/authContoller.js";
const router = express.Router();

router.get("/user", authMiddleware, checkUser);
router.get("/admin", authMiddleware, roleMiddleware("admin"), checkUser);

export const checkRouter = router;
