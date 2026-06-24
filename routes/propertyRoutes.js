import express from "express";

import {
  addProperty,
  getProperties,
  getFeaturedProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  approveProperty,
  rejectProperty,
} from "../controllers/propertyController.js";

import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

// ADD PROPERTY (OWNER ONLY)
router.post(
  "/",
  verifyToken,
  verifyRole("Owner"),
  addProperty
);

// GET ALL PROPERTIES
router.get("/", getProperties);

// FEATURED PROPERTIES
router.get("/featured", getFeaturedProperties);

// GET SINGLE PROPERTY
router.get("/:id", getPropertyById);

// UPDATE PROPERTY (OWNER ONLY)
router.patch(
  "/:id",
  verifyToken,
  verifyRole("Owner"),
  updateProperty
);

// DELETE PROPERTY (OWNER ONLY)
router.delete(
  "/:id",
  verifyToken,
  verifyRole("Owner"),
  deleteProperty
);

// APPROVE PROPERTY (ADMIN ONLY)
router.patch(
  "/approve/:id",
  verifyToken,
  verifyRole("Admin"),
  approveProperty
);

// REJECT PROPERTY (ADMIN ONLY)
router.patch(
  "/reject/:id",
  verifyToken,
  verifyRole("Admin"),
  rejectProperty
);

export default router;