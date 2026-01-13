const AboutBanner = require("../models/AboutBanner.model");
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

    // ✅ Save only relative URL
    const newImagePath = `/uploads/${req.file.filename}`;

    // ✅ Only one banner allowed
    const existing = await AboutBanner.findOne();

    if (existing) {
      // ✅ Delete old image safely
      if (existing.image) {
        const oldFilename = path.basename(existing.image);
        const oldFilePath = path.join(__dirname, "../../uploads", oldFilename);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // ✅ Remove old banner record
      await AboutBanner.deleteMany();
    }

    // ✅ Create new banner
    const banner = await AboutBanner.create({
      image: newImagePath,
    });

    res.status(201).json({
      success: true,
      message: "About banner created successfully",
      data: banner,
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
    const banner = await AboutBanner.findOne().sort({ createdAt: -1 });

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

    // ✅ Delete image safely
    if (banner.image) {
      const oldFilename = path.basename(banner.image);
      const oldFilePath = path.join(__dirname, "../../uploads", oldFilename);

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
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
