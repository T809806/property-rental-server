import express from "express";

import verifyToken from "../middleware/verifyToken.js";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

// ADD FAVORITE
router.post("/", verifyToken, addFavorite);

// GET MY FAVORITES
router.get("/", verifyToken, getFavorites);

// REMOVE FAVORITE
router.delete("/:id", verifyToken, removeFavorite);

export default router;