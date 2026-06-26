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


router.post("/", verifyToken, verifyRole("Owner"), addProperty);


router.get("/", getProperties);


router.get("/featured", getFeaturedProperties);


router.get(
  "/admin/all",
  verifyToken,
  verifyRole("Admin"),
  getAllPropertiesAdmin
);


router.get("/:id", getPropertyById);


router.patch("/:id", verifyToken, verifyRole("Owner"), updateProperty);


router.delete("/:id", verifyToken, verifyRole("Owner"), deleteProperty);


router.patch("/approve/:id", verifyToken, verifyRole("Admin"), approveProperty);


router.patch("/reject/:id", verifyToken, verifyRole("Admin"), rejectProperty);

export default router;