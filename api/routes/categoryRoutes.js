const express = require("express");
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categoryControllers");
const categroyImageUplaod = require("../middleware/categoryImageUpload");
const router = express.Router();

router.post("/", categroyImageUplaod.single("image"), createCategory);
router.get("/", getAllCategories);

module.exports = router;
