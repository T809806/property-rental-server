import Property from "../models/Property.js";

// ADD PROPERTY
export const addProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      owner: req.user?.id || "6857f0000000000000000001",
      status: "Pending",
    };

    const property = await Property.create(propertyData);

    res.status(201).json({
      message: "Property added successfully",
      property,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL PROPERTIES + SEARCH + FILTER + SORT
   export const getProperties = async (req, res) => {
  try {
    let { page = 1, limit = 6, location, propertyType, sort } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = { status: "Approved" };

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (propertyType && propertyType !== "All") {
      query.propertyType = propertyType;
    }

    let sortOption = {};

    if (sort === "low") sortOption.price = 1;
    if (sort === "high") sortOption.price = -1;

    const total = await Property.countDocuments(query);

    const properties = await Property.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      properties,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET FEATURED PROPERTIES
export const getFeaturedProperties = async (req, res) => {
  try {

    const properties = await Property.find({
      status: "Approved",
    }).limit(6);

    res.status(200).json(properties);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE PROPERTY
export const getPropertyById = async (req, res) => {
  try {

    const property = await Property.findById(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(property);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req, res) => {
  try {

    const property =
      await Property.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      message:
        "Property updated successfully",
      property,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PROPERTY
export const deleteProperty = async (req, res) => {
  try {

    const property =
      await Property.findByIdAndDelete(
        req.params.id
      );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      message:
        "Property deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// APPROVE PROPERTY
export const approveProperty = async (req, res) => {
  try {

    const property =
      await Property.findByIdAndUpdate(
        req.params.id,
        {
          status: "Approved",
          rejectionFeedback: "",
        },
        {
          new: true,
        }
      );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      message: "Property approved",
      property,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REJECT PROPERTY
export const rejectProperty = async (req, res) => {
  try {

    const { feedback } = req.body;

    const property =
      await Property.findByIdAndUpdate(
        req.params.id,
        {
          status: "Rejected",
          rejectionFeedback: feedback,
        },
        {
          new: true,
        }
      );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      message: "Property rejected",
      property,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllPropertiesAdmin =
  async (req, res) => {
    try {

      const properties =
        await Property.find()
          .populate(
            "owner",
            "name email"
          );

      res.status(200).json(
        properties
      );

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };