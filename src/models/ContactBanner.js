const mongoose = require("mongoose");

const contactBannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactBanner", contactBannerSchema);
