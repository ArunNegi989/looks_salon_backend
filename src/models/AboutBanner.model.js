const mongoose = require("mongoose");

const AboutBannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "AboutBanner",
  AboutBannerSchema
);
