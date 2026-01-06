const mongoose = require("mongoose");

const galleryBannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GalleryBanner", galleryBannerSchema);
