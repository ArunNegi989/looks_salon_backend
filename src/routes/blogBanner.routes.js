const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createBlogBanner,
  getBlogBanner,
  deleteBlogBanner,
} = require("../controllers/blogBanner.controller");

router.post("/create", upload.single("image"), createBlogBanner);
router.get("/get", getBlogBanner);
router.delete("/delete/:id", deleteBlogBanner);

module.exports = router;
