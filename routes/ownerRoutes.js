import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";

import {
  getOwnerAnalytics,
  getOwnerProperties,
  getMonthlyEarnings,
} from "../controllers/ownerController.js";

const router = express.Router();

// OWNER ANALYTICS
router.get(
  "/analytics",
  verifyToken,
  verifyRole("Owner"),
  getOwnerAnalytics
);

// MONTHLY EARNINGS CHART
router.get(
  "/monthly-earnings",
  verifyToken,
  verifyRole("Owner"),
  getMonthlyEarnings
);

// OWNER PROPERTIES
router.get(
  "/properties",
  verifyToken,
  verifyRole("Owner"),
  getOwnerProperties
);

export default router;