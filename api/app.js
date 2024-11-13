const express = require("express");
const app = express();
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cors());

// Routes

app.use("/api/v1/categories", categoryRoutes);
module.exports = app;
