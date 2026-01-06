const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const blogRoutes = require("./blogRoutes");
const bannerRoutes = require("./banner.routes")
const ourStoryRoutes = require("./ourStoryRoutes")
const whyJoinUsRoutes = require("./whyJoinUsRoutes")
const galleryRoutes = require("./galleryRoutes"); 

router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
router.use("/banner", bannerRoutes);
router.use("/our-story", ourStoryRoutes);
router.use("/why-join-us", whyJoinUsRoutes);
router.use("/gallery", galleryRoutes);
module.exports = router;
