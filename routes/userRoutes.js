import express from "express";

import {
  getAllUsers,
  changeUserRole,
} from "../controllers/userController.js";

import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

// GET ALL USERS (ADMIN)
router.get(
  "/",
  verifyToken,
  verifyRole("Admin"),
  getAllUsers
);

// CHANGE ROLE (ADMIN)
router.patch(
  "/role/:id",
  verifyToken,
  verifyRole("Admin"),
  changeUserRole
);

export default router;