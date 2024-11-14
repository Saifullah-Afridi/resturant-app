const express = require("express");
const {
  createDish,
  getAlldishes,
  getDishDetail,
  updateDishDetail,
  deleteDish,
} = require("../controllers/dishControllers");
const dishImageUpload = require("../middleware/dishImageUpload");

const router = express.Router();

router.get("/", getAlldishes);
router.get("/:id", getDishDetail);
router.post("/:categoryName", dishImageUpload.single("image"), createDish);
router.patch("/:id", dishImageUpload.single("image"), updateDishDetail);
router.delete("/:id", deleteDish);
module.exports = router;
