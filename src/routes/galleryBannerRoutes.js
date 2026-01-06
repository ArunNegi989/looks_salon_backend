const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  createBanner,
  getBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/galleryBannerController");

router.post("/create", upload.single("image"), createBanner);
router.get("/get", getBanner);
router.put("/update/:id", upload.single("image"), updateBanner);
router.delete("/delete/:id", deleteBanner); // ✅ FIXED

module.exports = router;
