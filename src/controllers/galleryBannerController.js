const GalleryBanner = require("../models/GalleryBanner");
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

    const newImagePath = `/uploads/${req.file.filename}`;

    // ✅ Only one banner allowed
    const existing = await GalleryBanner.findOne();

    if (existing) {
      if (existing.image) {
        const oldFilename = path.basename(existing.image);
        const oldFilePath = path.join(__dirname, "../../uploads", oldFilename);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      await GalleryBanner.deleteMany();
    }

    const banner = await GalleryBanner.create({
      image: newImagePath,
    });

    res.status(201).json({
      success: true,
      data: banner,
      message: "Gallery banner created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Create failed",
    });
  }
};

/* ================= GET ================= */
exports.getBanner = async (req, res) => {
  try {
    const banner = await GalleryBanner.findOne().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: banner || null,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Fetch failed",
    });
  }
};

/* ================= UPDATE ================= */
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await GalleryBanner.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    if (req.file) {
      // ✅ delete old image
      if (banner.image) {
        const oldFilename = path.basename(banner.image);
        const oldFilePath = path.join(__dirname, "../../uploads", oldFilename);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      banner.image = `/uploads/${req.file.filename}`;
    }

    await banner.save();

    res.json({
      success: true,
      data: banner,
      message: "Gallery banner updated",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

/* ================= DELETE ================= */
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await GalleryBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

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
      message: "Gallery banner deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
