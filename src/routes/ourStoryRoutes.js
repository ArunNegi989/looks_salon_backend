const express = require("express");
const {
  addOurStory,
  getAllOurStories,
  getOurStoryById,
  updateOurStory,
  deleteOurStory,
} = require("../controllers/ourStoryController");

const router = express.Router();

/* CREATE */
router.post("/add", addOurStory);

/* READ */
router.get("/", getAllOurStories);
router.get("/:id", getOurStoryById);

/* UPDATE */
router.put("/update/:id", updateOurStory);

/* DELETE */
router.delete("/delete/:id", deleteOurStory);

module.exports = router;
