const express = require("express");
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryControllers");
const categroyImageUplaod = require("../middleware/categoryImageUpload");
const router = express.Router();

router.post("/", categroyImageUplaod.single("image"), createCategory);
router.get("/", getAllCategories);
router.delete("/:id", deleteCategory);
router.patch("/:id", categroyImageUplaod.single("image"), updateCategory);

module.exports = router;
