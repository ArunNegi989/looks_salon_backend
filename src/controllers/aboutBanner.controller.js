const AboutBanner = require("../models/AboutBanner.model");
const fs = require("fs");

/* ================= GET ================= */
exports.getBanner = async (req, res) => {
  try {
    const banner = await AboutBanner.findOne();
    res.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch About banner",
    });
  }
};

/* ================= CREATE / UPDATE ================= */
exports.createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // check existing banner
    const existingBanner = await AboutBanner.findOne();

    // delete old image if exists
    if (existingBanner && fs.existsSync(existingBanner.image)) {
      fs.unlinkSync(existingBanner.image);
      await AboutBanner.deleteOne({ _id: existingBanner._id });
    }

    const banner = await AboutBanner.create({
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "About banner saved successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save banner",
    });
  }
};

/* ================= DELETE ================= */
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await AboutBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    if (fs.existsSync(banner.image)) {
      fs.unlinkSync(banner.image);
    }

    await banner.deleteOne();

    res.json({
      success: true,
      message: "About banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
