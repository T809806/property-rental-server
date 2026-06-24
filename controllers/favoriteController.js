import Favorite from "../models/Favorite.js";

// ADD TO FAVORITES
export const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { propertyId } = req.body;

    // DUPLICATE CHECK
    const exists = await Favorite.findOne({
      userId,
      propertyId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Already in favorites",
      });
    }

    const favorite = await Favorite.create({
      userId,
      propertyId,
    });

    res.status(201).json({
      message: "Added to favorites",
      favorite,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER FAVORITES
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.find({
      userId,
    }).populate("propertyId");

    res.status(200).json(favorites);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE FAVORITE
export const removeFavorite = async (req, res) => {
  try {

    const favorite = await Favorite.findById(
      req.params.id
    );

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found",
      });
    }

    await Favorite.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Favorite removed successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};