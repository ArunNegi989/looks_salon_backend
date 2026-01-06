const mongoose = require("mongoose");

const whyJoinUsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true, // CKEditor HTML
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WhyJoinUs", whyJoinUsSchema);
