const express = require("express");
const { createCategory } = require("../controllers/categoryControllers");
const categroyImageUplaod = require("../middleware/categoryImageUpload");
const router = express.Router();

// router.route("/").post(createCategory);

router.post("/", categroyImageUplaod.single("image"), createCategory);

module.exports = router;
