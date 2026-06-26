import express from "express";

import verifyToken from "../middleware/verifyToken.js";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();


router.post("/", verifyToken, addFavorite);


router.get("/", verifyToken, getFavorites);


router.delete("/:id", verifyToken, removeFavorite);

export default router;