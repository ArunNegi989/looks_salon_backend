const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const controller = require("../controllers/courseController");

router.post("/create", upload.single("image"), controller.createCourse);
router.get("/get-all-courses", controller.getAllCourses);
router.get("/:id", controller.getCourseById);
router.put("/update/:id", upload.single("image"), controller.updateCourse);
router.delete("/delete-course/:id", controller.deleteCourse);

module.exports = router;
