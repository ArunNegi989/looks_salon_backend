const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const controller = require("../controllers/looksgalleryController");

router.post("/create", upload.single("image"), controller.createGallery);
router.get("/get-all", controller.getAllGallery);
router.put("/update/:id", upload.single("image"), controller.updateGallery);
router.delete("/delete/:id", controller.deleteGallery);

module.exports = router;
