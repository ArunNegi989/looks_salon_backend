const OurFacility = require("../models/OurFacilities.model");
const fs = require("fs");
const path = require("path");

/* ================= CREATE ================= */
exports.createFacility = async (req, res) => {
  try {
    const { title } = req.body;

    // 🔴 LIMIT CHECK (MAX 3)
    const count = await OurFacility.countDocuments();
    if (count >= 3) {
      return res.status(400).json({
        success: false,
        message:
          "You can only add up to 3 Our Facilities. Please edit or delete an existing facility.",
      });
    }

    if (!title || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title and image are required",
      });
    }

    // ✅ Save relative path only
    const imagePath = `/uploads/${req.file.filename}`;

    const facility = await OurFacility.create({
      title,
      image: imagePath,
    });

    res.status(201).json({
      success: true,
      message: "Facility created successfully",
      data: facility,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET ALL ================= */
exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await OurFacility.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: facilities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch facilities",
    });
  }
};

/* ================= GET ONE ================= */
exports.getFacilityById = async (req, res) => {
  try {
    const facility = await OurFacility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found",
      });
    }

    res.status(200).json({
      success: true,
      data: facility,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= UPDATE ================= */
exports.updateFacility = async (req, res) => {
  try {
    const { title } = req.body;

    const facility = await OurFacility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found",
      });
    }

    const updateData = { title };

    // ✅ If new image uploaded → delete old image
    if (req.file) {
      if (facility.image) {
        const oldFilename = path.basename(facility.image);
        const oldFilePath = path.join(
          __dirname,
          "../../uploads",
          oldFilename
        );

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedFacility = await OurFacility.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Facility updated successfully",
      data: updatedFacility,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= DELETE ================= */
exports.deleteFacility = async (req, res) => {
  try {
    const facility = await OurFacility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found",
      });
    }

    // ✅ Delete image from uploads folder
    if (facility.image) {
      const filename = path.basename(facility.image);
      const filePath = path.join(__dirname, "../../uploads", filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await facility.deleteOne();

    res.status(200).json({
      success: true,
      message: "Facility deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
