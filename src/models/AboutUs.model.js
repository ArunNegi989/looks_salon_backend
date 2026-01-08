const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortPara: { type: String, required: true },

    mainImage: { type: String },

    ourStory: {
      description: { type: String, required: true },
      images: [String], // exactly 2 images
    },

    numbers: {
      graduates: Number,
      trainers: Number,
      years: Number,
      rate: Number,
    },

    mission: {
      title: String,
      description: String,
      tags: [String],
      image: String,
    },

    vision: {
      title: String,
      description: String,
      tags: [String],
      image: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutUs", AboutUsSchema);
