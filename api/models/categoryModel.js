const mongoose = require("mongoose"); // Erase if already required

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name of category"],
    unique: [true, "Category name must be unique"],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
