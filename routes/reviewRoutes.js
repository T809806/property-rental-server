import express from "express";
import verifyToken from "../middleware/verifyToken.js";

import {
  createReview,
  getPropertyReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", verifyToken, createReview);

router.get("/:propertyId", getPropertyReviews);

export default router;