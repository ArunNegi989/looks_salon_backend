const express = require("express");
const {
  addWhyJoinUs,
  getWhyJoinUs,
  getWhyJoinUsById,
  updateWhyJoinUs,
  deleteWhyJoinUs,
} = require("../controllers/whyJoinUsController");

const router = express.Router();

/* CREATE */
router.post("/add", addWhyJoinUs);

/* READ */
router.get("/", getWhyJoinUs);
router.get("/:id", getWhyJoinUsById);

/* UPDATE */
router.put("/update/:id", updateWhyJoinUs);

/* DELETE */
router.delete("/delete/:id", deleteWhyJoinUs);

module.exports = router;
