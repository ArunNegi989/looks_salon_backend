const Brand = require("../models/Brand");
const fs = require("fs");
const path = require("path");

/* ================= ADD BRAND ================= */
exports.addBrand = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title and image are required",
      });
    }

    const brand = new Brand({
      title,
      image: req.file.path,
    });

    await brand.save();

    res.status(201).json({
      success: true,
      message: "Brand added successfully",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET ALL BRANDS ================= */
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: brands,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= DELETE BRAND ================= */
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    // ✅ Safe image delete
    if (brand.image) {
      const imagePath = path.join(
        process.cwd(),
        brand.image.replace(/\\/g, "/")
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Brand.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    console.error("Delete Brand Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete brand",
    });
  }
};


/* ================= UPDATE BRAND ================= */
exports.updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) throw new Error();

    if (req.body.title) {
      brand.title = req.body.title;
    }

    if (req.file) {
      fs.unlinkSync(path.join(__dirname, "..", brand.image));
      brand.image = req.file.path;
    }

    await brand.save();

    res.json({
      success: true,
      message: "Brand updated",
      data: brand,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to update brand",
    });
  }
};
