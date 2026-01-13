const Looksgallery = require("../models/Looksgallery");
const fs = require("fs");
const path = require("path");

/* ================= CREATE ================= */
exports.createGallery = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title, category aur image required hai",
      });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const gallery = await Looksgallery.create({
      title,
      category,
      image: imagePath,
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

/* ================= GET ALL ================= */
exports.getAllGallery = async (req, res) => {
  try {
    const galleries = await Looksgallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: galleries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= UPDATE ================= */
exports.updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category } = req.body;

    const gallery = await Looksgallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    if (title) gallery.title = title;
    if (category) gallery.category = category;

    // if new image uploaded
    if (req.file) {
      // delete old image
      if (gallery.image) {
        const oldFilename = path.basename(gallery.image);
        const oldFilePath = path.join(__dirname, "../../uploads", oldFilename);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      gallery.image = `/uploads/${req.file.filename}`;
    }

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= DELETE ================= */
exports.deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Looksgallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    if (gallery.image) {
      const filename = path.basename(gallery.image);
      const filePath = path.join(__dirname, "../../uploads", filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await gallery.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
