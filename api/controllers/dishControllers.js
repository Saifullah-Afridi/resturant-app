const Category = require("../models/categoryModel");
const Dish = require("../models/dishModel");

const createDish = async (req, res) => {
  const { categoryName } = req.params;
  try {
    const image = {
      url: req.file.path,
      public_id: req.file.filename,
    };
    const category = await Category.findOne({ name: categoryName });
    const dish = await Dish.create({
      image,
      ...req.body,
      category: category._id,
    });

    category.dishes.push(dish._id);

    await category.save();
    res.status(201).json({
      status: "success",
      dish,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      messsage: error.message,
    });
  }
};

const getAlldishes = async (req, res) => {
  try {
    const dishes = await Dish.find();

    res.status(200).json({
      status: "success",
      totalDishes: dishes.length,
      dishes,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      messsage: error.message,
    });
  }
};

const getDishDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const dish = await Dish.findById(id);

    res.status(200).json({
      status: "success",
      dish,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      messsage: error.message,
    });
  }
};
const updateDishDetail = async (req, res) => {
  try {
    const dish = await Dish.findById(id);

    const { id } = req.params;
    if (req.file) {
      const image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
      dish.image = image;
    }

    await dish.save();
  } catch (error) {}
};

module.exports = { createDish, getAlldishes, getDishDetail, updateDishDetail };
