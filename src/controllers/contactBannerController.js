const ContactBanner = require("../models/ContactBanner");
const fs = require("fs");
const path = require("path");

/* ================= CREATE ================= */
exports.createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Remove old banner (only one allowed)
    const existing = await ContactBanner.findOne();
    if (existing) {
      fs.unlinkSync(existing.image);
      await ContactBanner.deleteMany();
    }

    const banner = await ContactBanner.create({
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      data: banner,
      message: "Contact banner created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET ================= */
exports.getBanner = async (req, res) => {
  try {
    const banner = await ContactBanner.findOne().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: banner,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch banner",
    });
  }
};

/* ================= DELETE ================= */
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await ContactBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    fs.unlinkSync(banner.image);
    await banner.deleteOne();

    res.json({
      success: true,
      message: "Contact banner deleted",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
