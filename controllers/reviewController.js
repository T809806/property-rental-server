import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      propertyId: req.body.propertyId,
      userId: req.user.id,
      name: req.body.name,
      email: req.body.email,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPropertyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      propertyId: req.params.propertyId,
    }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};