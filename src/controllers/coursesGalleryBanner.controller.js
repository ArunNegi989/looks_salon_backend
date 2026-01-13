const CoursesGalleryBanner = require("../models/CoursesGalleryBanner");
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

    // ✅ Save only relative path
    const newImagePath = `/uploads/${req.file.filename}`;

    // ✅ Check existing banner (only one allowed)
    const existing = await CoursesGalleryBanner.findOne();

    if (existing) {
      // ✅ Remove old image file
      if (existing.image) {
        const oldFilename = path.basename(existing.image);
        const oldFilePath = path.join(__dirname, "../../uploads", oldFilename);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // ✅ Remove old banner from DB
      await CoursesGalleryBanner.deleteMany();
    }

    // ✅ Create new banner
    const banner = await CoursesGalleryBanner.create({
      image: newImagePath,
    });

    res.status(201).json({
      success: true,
      message: "Courses gallery banner created",
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
    const banner = await CoursesGalleryBanner.findOne().sort({
      createdAt: -1,
    });

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
    const banner = await CoursesGalleryBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // ✅ Delete image file
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
      message: "Courses gallery banner deleted",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
