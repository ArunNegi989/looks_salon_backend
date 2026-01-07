const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const blogRoutes = require("./blogRoutes");
const bannerRoutes = require("./banner.routes");
const ourStoryRoutes = require("./ourStoryRoutes");
const whyJoinUsRoutes = require("./whyJoinUsRoutes");
const galleryRoutes = require("./galleryRoutes");
const looksGalleryRoutes = require("./looksgalleryRoutes");
const galleryBannerRoutes = require("./galleryBannerRoutes");
const courseRoutes = require("./courseRoutes");
const coursesGalleryBannerRoutes = require("./coursesGalleryBanner.routes");
const brandRoutes = require("./brandRoutes"); 

router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
router.use("/banner", bannerRoutes);
router.use("/our-story", ourStoryRoutes);
router.use("/why-join-us", whyJoinUsRoutes);
router.use("/gallery", galleryRoutes);
router.use("/looksgallery", looksGalleryRoutes);
router.use("/gallery-banner", galleryBannerRoutes);
router.use("/courses", courseRoutes);
router.use("/courses-gallery-banner", coursesGalleryBannerRoutes);
router.use("/brands", brandRoutes); 

module.exports = router;
