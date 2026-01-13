const Blog = require("../models/Blog");
const fs = require("fs");
const path = require("path");

/* ================= CREATE BLOG ================= */
exports.createBlog = async (req, res) => {
  try {
    const { title, shortPara, content1, content2 } = req.body;

    if (!title || !shortPara) {
      return res.status(400).json({
        success: false,
        message: "Title & shortPara are required",
      });
    }

    // ✅ FIXED PATH
    const mainImage = req.files?.mainImage?.[0]
      ? `/uploads/${req.files.mainImage[0].filename}`
      : null;

    const gallery = req.files?.gallery
      ? req.files.gallery.map(
          (file) => `/uploads/${file.filename}`
        )
      : [];

    const blog = await Blog.create({
      title,
      shortPara,
      mainImage,
      gallery,
      content1,
      content2,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
};

/* ================= GET ALL BLOGS ================= */
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

/* ================= GET BLOG BY ID ================= */
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Invalid blog ID",
    });
  }
};

/* ================= UPDATE BLOG ================= */
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const { title, shortPara, content1, content2 } = req.body;

    if (req.files?.mainImage?.[0]) {
      blog.mainImage = `/uploads/${req.files.mainImage[0].filename}`;
    }

    if (req.files?.gallery) {
      blog.gallery = req.files.gallery.map(
        (file) => `/uploads/${file.filename}`
      );
    }

    blog.title = title ?? blog.title;
    blog.shortPara = shortPara ?? blog.shortPara;
    blog.content1 = content1 ?? blog.content1;
    blog.content2 = content2 ?? blog.content2;

    await blog.save();

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to update blog",
    });
  }
};

/* ================= DELETE BLOG ================= */
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
};
