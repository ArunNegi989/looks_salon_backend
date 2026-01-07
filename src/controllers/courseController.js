const Course = require("../models/Course");

/* ================= CREATE COURSE ================= */
exports.createCourse = async (req, res) => {
  try {
    const { title, brand, price, duration, level, description, tags } = req.body;

    const course = new Course({
      title,
      brand,
      price,
      duration,
      level,
      description,
      tags: tags ? JSON.parse(tags) : [],
      image: req.file ? req.file.filename : null,
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= GET SINGLE COURSE ================= */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE COURSE ================= */
exports.updateCourse = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };

    if (req.body.tags) {
      updatedData.tags = JSON.parse(req.body.tags);
    }

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= DELETE COURSE ================= */
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 