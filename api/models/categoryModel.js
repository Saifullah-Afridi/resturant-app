const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Category name should be unique"],
    required: [true, "Please provide name of category"],
    unique: [true, "Category name must be unique"],
  },
  image: {
    url: {
      type: String,
      required: [true, "Please provide image URl"],
    },
    public_id: {
      type: String,
      required: [true, "Please provide image public id"],
    },
  },
  dishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
