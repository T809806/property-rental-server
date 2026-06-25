import express from "express";
import {
  createPayment,
  saveTransaction,
  getTransactions,
} from "../controllers/paymentController.js";

import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

router.post("/create-payment-intent", verifyToken, createPayment);
router.post("/save", verifyToken, saveTransaction);
router.get("/", verifyToken, verifyRole("Admin"), getTransactions);

export default router;