const BlogBanner = require("../models/BlogBanner.model");
const fs = require("fs");
const path = require("path");

/* ================= CREATE / UPDATE ================= */
exports.createBlogBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // Check existing banner
    const existingBanner = await BlogBanner.findOne();

    // If exists → delete old image
    if (existingBanner) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        existingBanner.image
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      existingBanner.image = req.file.path;
      await existingBanner.save();

      return res.json({
        success: true,
        message: "Blog banner updated successfully",
        data: existingBanner,
      });
    }

    // Create new banner
    const banner = await BlogBanner.create({
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Blog banner created successfully",
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
exports.getBlogBanner = async (req, res) => {
  try {
    const banner = await BlogBanner.findOne();

    res.json({
      success: true,
      data: banner,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog banner",
    });
  }
};

/* ================= DELETE ================= */
exports.deleteBlogBanner = async (req, res) => {
  try {
    const banner = await BlogBanner.findById(req.params.id);

    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    const imagePath = path.join(__dirname, "..", banner.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await banner.deleteOne();

    res.json({
      success: true,
      message: "Blog banner deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
