const Banner = require("../models/Banner.model");
const fs = require("fs");
const path = require("path");

/* ================= ADD (MULTIPLE) ================= */
exports.addBanner = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No banner uploaded",
      });
    }

    const bannersData = req.files.map((file) => ({
      image: `/uploads/${file.filename}`, // ✅ relative path
      position: "home",
      status: true,
    }));

    const banners = await Banner.insertMany(bannersData);

    res.status(201).json({
      success: true,
      message: "Banner added successfully",
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Banner upload failed",
    });
  }
};

/* ================= GET ================= */
exports.getHomeBanners = async (req, res) => {
  try {
    const banners = await Banner.find({
      status: true,
      position: "home",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: banners,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
    });
  }
};

/* ================= DELETE ================= */
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // ✅ Delete image file safely
    if (banner.image) {
      const filename = path.basename(banner.image);
      const filePath = path.join(__dirname, "../../uploads", filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await banner.deleteOne();

    res.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete banner",
    });
  }
};
