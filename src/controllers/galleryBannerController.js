const GalleryBanner = require("../models/GalleryBanner");

/* ================= CREATE ================= */
exports.createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image required",
      });
    }

    const banner = await GalleryBanner.create({
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      data: banner,
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
      banner.image = req.file.path;
    }

    await banner.save();

    res.json({
      success: true,
      data: banner,
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
    const { id } = req.params;

    const banner = await GalleryBanner.findById(id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    await GalleryBanner.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
