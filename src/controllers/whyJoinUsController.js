const WhyJoinUs = require("../models/WhyJoinUs");

/* =========================
   ADD WHY JOIN US
========================= */
exports.addWhyJoinUs = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const data = await WhyJoinUs.create({ title, content });

    res.status(201).json({
      success: true,
      message: "Why Join Us created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   GET ALL (ADMIN / WEBSITE)
========================= */
exports.getWhyJoinUs = async (req, res) => {
  try {
    const data = await WhyJoinUs.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   GET SINGLE BY ID
========================= */
exports.getWhyJoinUsById = async (req, res) => {
  try {
    const data = await WhyJoinUs.findById(req.params.id);

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: "Invalid ID" });
  }
};

/* =========================
   UPDATE WHY JOIN US
========================= */
exports.updateWhyJoinUs = async (req, res) => {
  try {
    const { title, content } = req.body;

    const data = await WhyJoinUs.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Not found" });
    }

    res.status(200).json({
      success: true,
      message: "Why Join Us updated successfully",
      data,
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   DELETE WHY JOIN US
========================= */
exports.deleteWhyJoinUs = async (req, res) => {
  try {
    const data = await WhyJoinUs.findByIdAndDelete(req.params.id);

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Not found" });
    }

    res.status(200).json({
      success: true,
      message: "Why Join Us deleted successfully",
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
