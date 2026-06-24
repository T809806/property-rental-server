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

// CREATE BOOKING (TENANT)
router.post("/", verifyToken, createBooking);

// USER BOOKINGS (TENANT DASHBOARD)
router.get(
  "/user/:id",
  verifyToken,
  getUserBookings
);

// OWNER BOOKING REQUESTS
router.get(
  "/owner",
  verifyToken,
  verifyRole("Owner"),
  getOwnerBookingRequests
);

// APPROVE BOOKING (OWNER)
router.patch(
  "/approve/:id",
  verifyToken,
  verifyRole("Owner"),
  approveBooking
);

// REJECT BOOKING (OWNER)
router.patch(
  "/reject/:id",
  verifyToken,
  verifyRole("Owner"),
  rejectBooking
);

export default router;