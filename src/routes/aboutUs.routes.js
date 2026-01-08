const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const controller = require("../controllers/aboutUs.controller");

/* ================= CREATE ================= */
router.post(
  "/createAboutUs",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "image", maxCount: 2 },
    { name: "missionImage", maxCount: 1 },
    { name: "visionImage", maxCount: 1 },
  ]),
  controller.createAboutUs
);

/* ================= READ ================= */
router.get("/getAllAboutUs", controller.getAllAboutUs);

router.get("/getAboutUsById/:id", controller.getAboutUsById);

/* ================= UPDATE ================= */
router.put(
  "/updateAboutUs/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "image", maxCount: 2 },
    { name: "missionImage", maxCount: 1 },
    { name: "visionImage", maxCount: 1 },
  ]),
  controller.updateAboutUs
);

/* ================= DELETE ================= */
router.delete("/deleteAboutUs/:id", controller.deleteAboutUs);

module.exports = router;
