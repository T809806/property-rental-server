import express from "express";
import {
  createPayment,
  saveTransaction,
  getTransactions,
} from "../controllers/paymentController.js";

import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

// CREATE PAYMENT INTENT (TENANT)
router.post("/create-payment-intent", verifyToken, createPayment);

// SAVE TRANSACTION
router.post("/save", verifyToken, saveTransaction);

// GET ALL TRANSACTIONS (ADMIN ONLY)
router.get("/", verifyToken, verifyRole("Admin"), getTransactions);

export default router;