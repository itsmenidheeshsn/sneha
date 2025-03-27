import express from "express";
import { authMiddleware } from "../../middileware/authmiddileware.js";
import { checkUser } from "../../controllers/authContoller.js";
const router = express.Router();

router.get("/user", authMiddleware, checkUser);

export const checkRouter = router;
