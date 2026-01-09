const mongoose = require("mongoose");

const BlogBannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogBanner", BlogBannerSchema);
