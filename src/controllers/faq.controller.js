const Faq = require("../models/Faq.model");

/* ================= CREATE FAQ ================= */
exports.createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const faq = await Faq.create({ question, answer });

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET ALL FAQ ================= */
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET SINGLE FAQ ================= */
exports.getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= UPDATE FAQ ================= */
exports.updateFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const faq = await Faq.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= DELETE FAQ ================= */
exports.deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
