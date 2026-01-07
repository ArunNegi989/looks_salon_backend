const CoursesGalleryBanner = require("../models/CoursesGalleryBanner");

/* ================= CREATE ================= */
exports.createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    await CoursesGalleryBanner.deleteMany();

    const banner = await CoursesGalleryBanner.create({
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Courses gallery banner created",
      data: banner,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET ================= */
exports.getBanner = async (req, res) => {
  try {
    const banner = await CoursesGalleryBanner.findOne();
    res.json({ success: true, data: banner });
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

    await banner.deleteOne();

    res.json({
      success: true,
      message: "Banner deleted",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
