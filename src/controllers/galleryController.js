const Gallery = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

/* ================= HELPER ================= */
const deleteImage = (imgPath) => {
  if (!imgPath) return;

  const filename = path.basename(imgPath);
  const filePath = path.join(__dirname, "../../uploads", filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

/* ================= CREATE ================= */
exports.createGallery = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    if (!req.files || req.files.length !== 9) {
      return res.status(400).json({
        success: false,
        message: "Upload exactly 9 images",
      });
    }

    // ✅ SAVE RELATIVE PATHS
    const images = req.files.map(
      (file) => `/uploads/${file.filename}`
    );

    const gallery = await Gallery.create({
      title,
      description,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Gallery created successfully",
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= READ ALL ================= */
exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: galleries,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch galleries",
    });
  }
};

/* ================= READ SINGLE ================= */
exports.getSingleGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.json({
      success: true,
      data: gallery,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Invalid gallery ID",
    });
  }
};

/* ================= UPDATE ================= */
exports.updateGallery = async (req, res) => {
  try {
    const { title, description, imageIndexes } = req.body;

    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    // update text fields
    gallery.title = title ?? gallery.title;
    gallery.description = description ?? gallery.description;

    let images = [...gallery.images];

    if (req.files && req.files.length > 0) {
      const indexes = Array.isArray(imageIndexes)
        ? imageIndexes
        : [imageIndexes];

      req.files.forEach((file, i) => {
        const index = Number(indexes[i]);

        if (index >= 0 && index < images.length) {
          // ✅ delete old image
          deleteImage(images[index]);

          // ✅ replace with new image
          images[index] = `/uploads/${file.filename}`;
        }
      });
    }

    gallery.images = images;
    await gallery.save();

    res.json({
      success: true,
      message: "Gallery updated successfully",
      data: gallery,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= DELETE ================= */
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    // ✅ delete all images
    gallery.images.forEach(deleteImage);

    await gallery.deleteOne();

    res.json({
      success: true,
      message: "Gallery deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
