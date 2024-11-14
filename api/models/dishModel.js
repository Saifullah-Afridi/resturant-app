const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide dish name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide dish discription"],
  },
  price: {
    type: Number,
    required: [true, "Please provide dish price"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  flavors: [{ type: String }],
  ingredients: [
    {
      type: String,
    },
  ],
  image: {
    url: String,
    public_id: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
