const Course = require("../models/Course");
const fs = require("fs");
const path = require("path");

/* ================= CREATE COURSE ================= */
exports.createCourse = async (req, res) => {
  try {
    const { title, brand, price, duration, level, description, tags } = req.body;

    // basic validation
    if (!title || !price) {
      return res.status(400).json({
        success: false,
        message: "Title and price are required",
      });
    }

    // safe tags parsing
    let parsedTags = [];
    try {
      parsedTags = tags ? JSON.parse(tags) : [];
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid tags format",
      });
    }

    const course = await Course.create({
      title,
      brand,
      price,
      duration,
      level,
      description,
      tags: parsedTags,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET ALL COURSES ================= */
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET SINGLE COURSE ================= */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= UPDATE COURSE ================= */
exports.updateCourse = async (req, res) => {
  try {
    const { title, brand, price, duration, level, description, tags } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // update fields if provided
    if (title) course.title = title;
    if (brand) course.brand = brand;
    if (price) course.price = price;
    if (duration) course.duration = duration;
    if (level) course.level = level;
    if (description) course.description = description;

    // safe tags parsing
    if (tags) {
      try {
        course.tags = JSON.parse(tags);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid tags format",
        });
      }
    }

    // if new image uploaded → delete old image
    if (req.file) {
      if (course.image) {
        const oldFilename = path.basename(course.image);
        const oldFilePath = path.join(__dirname, "../../uploads", oldFilename);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      course.image = `/uploads/${req.file.filename}`;
    }

    await course.save();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= DELETE COURSE ================= */
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // delete image from server
    if (course.image) {
      const filename = path.basename(course.image);
      const filePath = path.join(__dirname, "../../uploads", filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await course.deleteOne();

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
