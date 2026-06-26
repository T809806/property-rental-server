import Property from "../models/Property.js";
import Booking from "../models/Booking.js";


export const getOwnerAnalytics = async (req, res) => {

  try {

 const ownerId = req.user.id;

 const properties = await Property.find({
      owner: ownerId,
    });

    const propertyIds = properties.map(
      (property) => property._id
    );

    const bookings = await Booking.find({
      propertyId: {
        $in: propertyIds,
      },
    });

    const totalProperties = properties.length;

    const totalBookings = bookings.filter(
      (booking) => booking.status === "Approved"
    ).length;

    const totalEarnings = bookings
      .filter(
        (booking) =>
          booking.paymentStatus === "Paid"
      )
      .reduce(
        (sum, booking) =>
          sum + (booking.amount || 0),
        0
      );

    res.status(200).json({
      totalProperties,
      totalBookings,
      totalEarnings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getOwnerProperties = async (
  req,
  res
) => {
  try {
    const properties = await Property.find({
      owner: req.user.id,
    });

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getMonthlyEarnings = async (
  req,
  res
) => {
  try {
    const ownerId = req.user.id;

    const properties = await Property.find({
      owner: ownerId,
    });

    const propertyIds = properties.map(
      (p) => p._id
    );

    const bookings = await Booking.find({
      propertyId: {
        $in: propertyIds,
      },
      paymentStatus: "Paid",
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyData = months.map(
      (month) => ({
        month,
        earnings: 0,
      })
    );

    bookings.forEach((booking) => {
      const monthIndex = new Date(
        booking.createdAt
      ).getMonth();

      monthlyData[monthIndex].earnings +=
        booking.amount || 0;
    });

    res.status(200).json(monthlyData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};