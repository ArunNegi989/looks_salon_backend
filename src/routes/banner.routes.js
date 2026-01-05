const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const bannerController = require("../controllers/banner.controller");

// multiple banner images upload
const bannerUpload = upload.array("banners", 10);

// static route first
router.get("/home", bannerController.getHomeBanners);

// dynamic routes
router.post("/add", bannerUpload, bannerController.addBanner);
router.delete("/delete/:id", bannerController.deleteBanner);

module.exports = router;
