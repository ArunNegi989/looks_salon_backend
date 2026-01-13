const BlogBanner = require("../models/BlogBanner.model");
const fs = require("fs");
const path = require("path");

/* ================= CREATE ================= */
exports.createBlogBanner = async (req, res) => {
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
    const existing = await BlogBanner.findOne();

    if (existing) {
      // ✅ Delete old image safely
      if (existing.image) {
        const oldFilename = path.basename(existing.image);
        const oldFilePath = path.join(
          __dirname,
          "../../uploads",
          oldFilename
        );

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // ✅ Remove old document
      await BlogBanner.deleteMany();
    }

    // ✅ Create new banner
    const banner = await BlogBanner.create({
      image: newImagePath,
    });

    res.status(201).json({
      success: true,
      data: banner,
      message: "Blog banner created",
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
    const banner = await BlogBanner.findOne().sort({ createdAt: -1 });

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
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    if (banner.image) {
      const oldFilename = path.basename(banner.image);
      const oldFilePath = path.join(
        __dirname,
        "../../uploads",
        oldFilename
      );

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    await banner.deleteOne();

    res.json({
      success: true,
      message: "Blog banner deleted",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
