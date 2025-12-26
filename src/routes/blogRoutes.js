const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const blogController = require("../controllers/blogController");

const blogUpload = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]);

// 🔥 STATIC ROUTE FIRST
router.get("/get-all-blogs", blogController.getAllBlogs);

// 🔥 DYNAMIC ROUTES AFTER
router.get("/get-blog/:id", blogController.getBlogById);

router.post("/create-blog", blogUpload, blogController.createBlog);
router.put("/update-blog/:id", blogUpload, blogController.updateBlog);
router.delete("/delete-blog/:id", blogController.deleteBlog);

module.exports = router;
