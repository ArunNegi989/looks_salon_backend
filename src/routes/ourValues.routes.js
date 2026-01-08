const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const {
  createOurValue,
  getAllOurValues,
  getOurValueById,
  updateOurValue,
  deleteOurValue,
} = require("../controllers/ourValues.controller");

router.post(
  "/create",
  upload.single("image"),
  createOurValue
);

router.get("/get-all", getAllOurValues);
router.get("/get/:id", getOurValueById);

router.put(
  "/update/:id",
  upload.single("image"),
  updateOurValue
);

router.delete("/delete/:id", deleteOurValue);

module.exports = router;
