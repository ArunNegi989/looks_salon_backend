const express = require("express");
const router = express.Router();

const {
  createBanner,
  getBanner,
  deleteBanner,
} = require("../controllers/coursesGalleryBanner.controller");

const  upload  = require("../middlewares/upload"); // ✅ matches export

router.post(
  "/create",
  upload.single("image"),
  createBanner
);

router.get("/get", getBanner);

router.delete("/delete/:id", deleteBanner);

module.exports = router;
