const express = require("express");
const app = express();
const categoryRoutes = require("./routes/categoryRoutes");
app.use(express.json());

// Routes

app.use("/api/v1/category", categoryRoutes);
module.exports = app;
