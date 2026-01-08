const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  getBanner,
  createBanner,
  deleteBanner,
} = require("../controllers/aboutBanner.controller");

router.get("/get", getBanner);
router.post("/create", upload.single("image"), createBanner);
router.delete("/delete/:id", deleteBanner);

module.exports = router;
