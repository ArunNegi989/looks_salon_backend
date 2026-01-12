const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const {
  createBanner,
  getBanner,
  deleteBanner,
} = require("../controllers/contactBannerController");

router.post("/create", upload.single("image"), createBanner);
router.get("/get", getBanner);
router.delete("/delete/:id", deleteBanner);

module.exports = router;
