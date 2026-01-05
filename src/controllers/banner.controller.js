const Banner = require("../models/Banner.model");

exports.addBanner = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No banner uploaded",
      });
    }

    const banners = await Banner.insertMany(
      req.files.map((file) => ({
        image: `/uploads/${file.filename}`,
        position: "home",
        status: true,
      }))
    );

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

exports.getHomeBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ status: true }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
    });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete banner",
    });
  }
};
