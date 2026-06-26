import express from "express";

import {
  createBooking,
  getUserBookings,
  getOwnerBookingRequests,
  approveBooking,
  rejectBooking,
} from "../controllers/bookingController.js";

import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();


router.post("/", verifyToken, createBooking);


router.get(
  "/user/:id",
  verifyToken,
  getUserBookings
);


router.get(
  "/owner",
  verifyToken,
  verifyRole("Owner"),
  getOwnerBookingRequests
);


router.patch(
  "/approve/:id",
  verifyToken,
  verifyRole("Owner"),
  approveBooking
);


router.patch(
  "/reject/:id",
  verifyToken,
  verifyRole("Owner"),
  rejectBooking
);

export default router;