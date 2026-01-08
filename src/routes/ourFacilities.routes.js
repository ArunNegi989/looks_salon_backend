const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const {
  createFacility,
  getAllFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
} = require("../controllers/ourFacilities.controller");

router.post(
  "/create",
  upload.single("image"),
  createFacility
);

router.get("/get-all", getAllFacilities);
router.get("/get/:id", getFacilityById);

router.put(
  "/update/:id",
  upload.single("image"),
  updateFacility
);

router.delete("/delete/:id", deleteFacility);

module.exports = router;
