import express from "express";
import { createPaymentSession } from "../controllers/paymentController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create-session", verifyToken, createPaymentSession);

export default router;