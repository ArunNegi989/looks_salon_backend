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

    const imagePath = `/uploads/${req.file.filename}`;

    const brand = await Brand.create({
      title,
      image: imagePath,
    });

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
      const filename = path.basename(brand.image);
      const filePath = path.join(__dirname, "../../uploads", filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await brand.deleteOne();

    res.json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
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

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    if (req.body.title) {
      brand.title = req.body.title;
    }

    if (req.file) {
      // ✅ delete old image safely
      if (brand.image) {
        const oldFilename = path.basename(brand.image);
        const oldFilePath = path.join(__dirname, "../../uploads", oldFilename);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      brand.image = `/uploads/${req.file.filename}`;
    }

    await brand.save();

    res.json({
      success: true,
      message: "Brand updated successfully",
      data: brand,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to update brand",
    });
  }
};
