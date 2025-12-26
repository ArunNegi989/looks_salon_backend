const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortPara: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
    },
    gallery: {
      type: [String],
    },
    content1: {
      type: String,
    },
    content2: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
