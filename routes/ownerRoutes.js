import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";

import {
  getOwnerAnalytics,
  getOwnerProperties,
  getMonthlyEarnings,
} from "../controllers/ownerController.js";

const router = express.Router();


router.get(
  "/analytics",
  verifyToken,
  verifyRole("Owner"),
  getOwnerAnalytics
);


router.get(
  "/monthly-earnings",
  verifyToken,
  verifyRole("Owner"),
  getMonthlyEarnings
);


router.get(
  "/properties",
  verifyToken,
  verifyRole("Owner"),
  getOwnerProperties
);

export default router;