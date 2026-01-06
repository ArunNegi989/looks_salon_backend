const Gallery = require("../models/Gallery");

/* ================= CREATE ================= */
exports.createGallery = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!req.files || req.files.length !== 9) {
      return res.status(400).json({ message: "Upload exactly 9 images" });
    }

    const images = req.files.map((file) => file.path);

    const gallery = await Gallery.create({
      title,
      description,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Gallery created",
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= READ ALL ================= */
exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, data: galleries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= READ SINGLE ================= */
exports.getSingleGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE ================= */
exports.updateGallery = async (req, res) => {
  try {
    const { title, description } = req.body;
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    let images = [...gallery.images];

    if (req.files && req.files.length > 0) {
      const indexes = req.body.imageIndexes;

      req.files.forEach((file, i) => {
        const index = Array.isArray(indexes)
          ? Number(indexes[i])
          : Number(indexes);

        images[index] = file.path;
      });
    }

    gallery.title = title;
    gallery.description = description;
    gallery.images = images;

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
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
      return res.status(404).json({ message: "Gallery not found" });
    }

    await gallery.deleteOne();

    res.json({
      success: true,
      message: "Gallery deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
