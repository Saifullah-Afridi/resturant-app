const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
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

//but you need to delte all the dishes with that id too
//that we will do it later
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Category has been deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      msessage: error.message,
    });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json({
      status: "success",
      category,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      msessage: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (req.body.name) {
      category.name = req.body.name;
    }

    if (req.file) {
      category.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }
    await category.save();
    res.status(200).json({
      status: "success",
      message: "Category has been updated",
      category,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      msessage: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  getSingleCategory,
  updateCategory,
};
