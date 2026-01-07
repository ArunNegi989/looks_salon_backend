const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  addBrand,
  getAllBrands,
  deleteBrand,
  updateBrand,
} = require("../controllers/brandController");

router.post("/add", upload.single("image"), addBrand);
router.get("/get-all", getAllBrands);
router.delete("/delete/:id", deleteBrand);
router.put("/update/:id", upload.single("image"), updateBrand);

module.exports = router;
