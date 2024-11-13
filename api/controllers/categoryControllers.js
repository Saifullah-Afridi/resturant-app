const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  console.log("i am here");

  try {
    const { name } = req.body;
    const image = {
      url: req.file.path,
      public_id: req.file.filename,
    };

    const category = await Category.create({ name, image });
    res.status(201).json({
      status: "success",
      category,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({
      status: "success",
      totalCategories: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",

      message: "err.message",
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
