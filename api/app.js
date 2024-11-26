const express = require("express");
const app = express();
const categoryRoutes = require("./routes/categoryRoutes");
const dishesRoutes = require("./routes/dishRoutes");
const usersRoutes = require("./routes/userRoutes");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/dishes", dishesRoutes);
app.use("/api/v1/users", usersRoutes);

//exporting app
module.exports = app;
