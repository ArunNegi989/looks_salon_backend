const express = require("express");
const upload = require("../middlewares/upload");
const {
  createGallery,
  getAllGalleries,
  getSingleGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

const router = express.Router();

/* CREATE GALLERY */
router.post(
  "/create-gallery",
  upload.array("images", 9),
  createGallery
);

/* GET ALL GALLERIES */
router.get(
  "/get-all-gallery",
  getAllGalleries
);

/* GET SINGLE GALLERY */
router.get(
  "/get-gallery/:id",
  getSingleGallery
);

/* UPDATE GALLERY */
router.put(
  "/update-gallery/:id",
  upload.array("images", 9),
  updateGallery
);

/* DELETE GALLERY */
router.delete(
  "/delete-gallery/:id",
  deleteGallery
);

module.exports = router;
