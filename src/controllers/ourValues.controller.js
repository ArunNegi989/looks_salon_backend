const OurValue = require("../models/OurValues.model");

/* ================= CREATE ================= */
exports.createOurValue = async (req, res) => {
  try {
    const { title, icon, description } = req.body;

    // 🔴 COUNT CHECK
    const count = await OurValue.countDocuments();

    if (count >= 3) {
      return res.status(400).json({
        success: false,
        message:
          "You can only add up to 3 Our Values. Please edit or delete an existing value.",
      });
    }

    if (!title || !icon || !description || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const value = await OurValue.create({
      title,
      icon,
      description,
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Our Value created successfully",
      data: value,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


/* ================= GET ALL ================= */
exports.getAllOurValues = async (req, res) => {
  try {
    const values = await OurValue.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: values,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Our Values",
    });
  }
};

/* ================= GET SINGLE ================= */
exports.getOurValueById = async (req, res) => {
  try {
    const value = await OurValue.findById(req.params.id);

    if (!value) {
      return res.status(404).json({
        success: false,
        message: "Our Value not found",
      });
    }

    res.status(200).json({
      success: true,
      data: value,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= UPDATE ================= */
exports.updateOurValue = async (req, res) => {
  try {
    const { title, icon, description } = req.body;

    const updateData = { title, icon, description };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const value = await OurValue.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!value) {
      return res.status(404).json({
        success: false,
        message: "Our Value not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Our Value updated successfully",
      data: value,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= DELETE ================= */
exports.deleteOurValue = async (req, res) => {
  try {
    const value = await OurValue.findByIdAndDelete(req.params.id);

    if (!value) {
      return res.status(404).json({
        success: false,
        message: "Our Value not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Our Value deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
