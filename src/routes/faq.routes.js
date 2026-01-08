const express = require("express");
const router = express.Router();

const {
  createFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
} = require("../controllers/faq.controller");

router.post("/create", createFaq);
router.get("/get-all-faqs", getAllFaqs);
router.get("/get-faq/:id", getFaqById);
router.put("/update-faq/:id", updateFaq);
router.delete("/delete-faq/:id", deleteFaq);

module.exports = router;
