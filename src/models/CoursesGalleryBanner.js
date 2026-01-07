const mongoose = require("mongoose");

const coursesGalleryBannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CoursesGalleryBanner",
  coursesGalleryBannerSchema
);
