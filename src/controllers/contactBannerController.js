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

    // ✅ Save only relative URL in DB
    const newImagePath = `/uploads/${req.file.filename}`;

    // ✅ Check existing banner (only one allowed)
    const existing = await ContactBanner.findOne();

    if (existing) {
      // ✅ Remove old file safely
      if (existing.image) {
        const oldFilename = path.basename(existing.image); // gets only filename
        const oldFilePath = path.join(__dirname, "../../uploads", oldFilename);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // ✅ Remove old banner document
      await ContactBanner.deleteMany();
    }

    // ✅ Create new banner
    const banner = await ContactBanner.create({
      image: newImagePath,
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
    
      if (banner.image) {
        const oldFilename = path.basename(banner.image); // gets only filename
        const oldFilePath = path.join(__dirname, "../../uploads", oldFilename);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
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
