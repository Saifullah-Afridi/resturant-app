const Category = require("../models/categoryModel");
const Dish = require("../models/dishModel");
const cloudinary = require("cloudinary").v2;

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

const deleteCategory = async (req, res) => {

  console.log("hello from category controller")
  try {
    const { id } = req.params;

    //find all the dishes with the given category
    let dishesToBeDeleted = await Dish.find({ category: id });

    //now delete the images for each dish which are stored in the cloudinary

    for (const dish of dishesToBeDeleted) {
      if (dish.image && dish.image.public_id) {
        await cloudinary.uploader.destroy(dish.image.public_id);
      }
    }
    //now delelte all the dishes with that id
    await Dish.deleteMany({ category: id });

    //now delete the category
    //it will return the category which will be delted for further operation
    //like deleting of the images later
    const category = await Category.findByIdAndDelete(id, {
      returnDocument: "before",
    });

    //delte the image of the category from the cloudinary
    if (category.image && category.image.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    res.status(200).json({
      status: "success",
      message: "Category and dishes with that category has been deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
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
    console.log(req.body);
    
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
