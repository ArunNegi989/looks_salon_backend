const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const blogRoutes = require("./blogRoutes");
const bannerRoutes = require("./banner.routes")
const ourStoryRoutes = require("./ourStoryRoutes")

router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
router.use("/banner", bannerRoutes);
router.use("/our-story", ourStoryRoutes);

module.exports = router;
