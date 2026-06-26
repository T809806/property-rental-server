import Booking from "../models/Booking.js";
import Property from "../models/Property.js";


export const createBooking = async (req, res) => {
  try {
    const {
      propertyId,
      moveInDate,
      contactNumber,
      notes,
    } = req.body;

    const property =
      await Property.findById(propertyId);

      if (!property) {
  return res.status(404).json({
    message: "Property not found",
  });
}

    const booking = await Booking.create({
      propertyId,
      userId: req.user.id,
      moveInDate,
      contactNumber,
      notes,
      amount: property.price,
      paymentStatus: "Pending",
      status: "Pending",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getUserBookings = async (
  req,
  res
) => {
  try {
    const userId = req.params.id;

    const bookings = await Booking.find({
      userId,
    }).populate("propertyId");

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getOwnerBookingRequests =

  async (req, res) => {
    try {
      const ownerId = req.user.id;

      const properties =
        await Property.find({
          owner: ownerId,
        });

      const propertyIds =
        properties.map((p) => p._id);

      const bookings =
        await Booking.find({
          propertyId: {
            $in: propertyIds,
          },
        })
          .populate("propertyId")
          .populate("userId");

      res.status(200).json(bookings);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


export const approveBooking = async (
  req,
  res
) => {
  try {
    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: "Approved",
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      message: "Booking approved",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



  export const rejectBooking = async (req, res) => {

  try {
    const { reason } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
        rejectionReason: reason,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Booking rejected",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};