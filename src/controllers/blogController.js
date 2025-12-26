const Blog = require("../models/Blog");


exports.createBlog = async (req, res) => {
  try {
    const { title, shortPara, content1, content2 } = req.body;

    if (!title || !shortPara) {
      return res.status(400).json({ message: "Title & shortPara are required" });
    }

    const mainImage = req.files?.mainImage?.[0]?.filename || null;
    const gallery = req.files?.gallery
      ? req.files.gallery.map((file) => file.filename)
      : [];

    const blog = await Blog.create({
      title,
      shortPara,
      mainImage,
      gallery,
      content1,
      content2,
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: error.message,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};


exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid blog ID",
      error: error.message,
    });
  }
};

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
      blog.mainImage = req.files.mainImage[0].filename;
    }

    if (req.files?.gallery) {
      blog.gallery = req.files.gallery.map((file) => file.filename);
    }

    blog.title = title ?? blog.title;
    blog.shortPara = shortPara ?? blog.shortPara;
    blog.content1 = content1 ?? blog.content1;
    blog.content2 = content2 ?? blog.content2;

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update blog",
      error: error.message,
    });
  }
};


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

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete blog",
      error: error.message,
    });
  }
};
