const Category = require("../models/categoryModel");
const cloudinary = require("cloudinary").v2;

const Dish = require("../models/dishModel");

const createDish = async (req, res) => {
  try {
    const image = {
      url: req.file.path,
      public_id: req.file.filename,
    };
    let { category } = req.body;
    const foundCategory = await Category.findOne({ name: category });

    const dish = await Dish.create({
      image,
      ...req.body,
      category: foundCategory._id,
    });

    foundCategory?.dishes?.push(dish._id);

    await foundCategory.save();
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
    const dishes = await Dish.find().populate("category");

    res.status(200).json({
      status: "success",
      totalDishes: dishes.length,
      dishes,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      messsage: error,
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
  const { name, category, price, description, flavors, ingredients } = req.body;

  try {
    const { id } = req.params;
    const dish = await Dish.findById(id);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    if (req.file) {
      const image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
      dish.image = image;
    }

    const isCategory = await Category.findOne({ name: category });

    // Object.assign(dish, req.body);
    dish.name = name;
    dish.category = isCategory._id;
    dish.description = description;
    dish.flavors = flavors;
    dish.ingredients = ingredients;
    dish.price = price;

    await dish.save();

    res.status(200).json({
      status: "success",
      dish,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

//copied from chatgt

//we will use it later
const searchDishes = async (req, res) => {
  try {
    const { query } = req.query; // Access the search query from the query string

    if (!query) {
      return res.status(400).json({
        status: "fail",
        message: "Search query is required",
      });
    }

    // Search for dishes by name or category, case-insensitive (i flag)
    const dishes = await Dish.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive search by name
        { category: { $regex: query, $options: "i" } }, // Case-insensitive search by category
      ],
    });

    // If no dishes are found, return a message
    if (dishes.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No dishes found matching your search criteria",
      });
    }

    res.status(200).json({
      status: "success",
      totalDishes: dishes.length,
      dishes,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteDish = async (req, res) => {
  try {
    console.log("ehllo");

    const { id } = req.params;

    const dish = await Dish.findByIdAndDelete(id, { returnDocument: "before" });

    if (dish.category) {
      await Category.findByIdAndUpdate(dish.category, {
        $pull: { dishes: dish._id },
      });
    }
    console.log("1111111111111111111111111111");

    if (dish.image && dish.image.public_id) {
      await cloudinary.uploader.destroy(dish.image.public_id);
    }
    console.log("22222222222222222222222222222222222");

    res.status(200).json({
      status: "success",
      message: "Dish deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};



    //  ***********************************      //rating controller/ for later / *******************************
 






module.exports = {
  createDish,
  getAlldishes,
  getDishDetail,
  updateDishDetail,
  deleteDish,
};
