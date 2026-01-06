const Looksgallery = require("../models/Looksgallery");

// CREATE
exports.createGallery = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title, category aur image required hai",
      });
    }

    const gallery = await Looksgallery.create({
      title,
      category,
      image: req.file.path,
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

// GET ALL
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


// UPDATE
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

    // Update fields
    if (title) gallery.title = title;
    if (category) gallery.category = category;

    // If new image uploaded
    if (req.file) {
      gallery.image = req.file.path;
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



// DELETE
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

    await Looksgallery.findByIdAndDelete(id);

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
