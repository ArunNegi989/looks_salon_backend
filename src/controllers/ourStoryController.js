const OurStory = require("../models/OurStory");

/* ADD */
exports.addOurStory = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const story = await OurStory.create({ title, content });

    res.status(201).json({
      success: true,
      message: "Our Story created successfully",
      data: story,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* GET ALL */
exports.getAllOurStories = async (req, res) => {
  const stories = await OurStory.find().sort({ createdAt: -1 });
  res.json({ success: true, data: stories });
};

/* GET ONE */
exports.getOurStoryById = async (req, res) => {
  const story = await OurStory.findById(req.params.id);
  if (!story) {
    return res.status(404).json({ success: false, message: "Not found" });
  }
  res.json({ success: true, data: story });
};

/* UPDATE */
exports.updateOurStory = async (req, res) => {
  const story = await OurStory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data: story });
};

/* DELETE */
exports.deleteOurStory = async (req, res) => {
  await OurStory.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Deleted successfully" });
};
