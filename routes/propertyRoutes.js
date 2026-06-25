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
  getAllPropertiesAdmin,
} from "../controllers/propertyController.js";

import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

// ADD PROPERTY
router.post("/", verifyToken, verifyRole("Owner"), addProperty);

// PUBLIC PROPERTIES
router.get("/", getProperties);

// FEATURED
router.get("/featured", getFeaturedProperties);

// ADMIN - ALL PROPERTIES
router.get(
  "/admin/all",
  verifyToken,
  verifyRole("Admin"),
  getAllPropertiesAdmin
);

// SINGLE PROPERTY
router.get("/:id", getPropertyById);

// UPDATE
router.patch("/:id", verifyToken, verifyRole("Owner"), updateProperty);

// DELETE
router.delete("/:id", verifyToken, verifyRole("Owner"), deleteProperty);

// APPROVE (ADMIN)
router.patch("/approve/:id", verifyToken, verifyRole("Admin"), approveProperty);

// REJECT (ADMIN)
router.patch("/reject/:id", verifyToken, verifyRole("Admin"), rejectProperty);

export default router;