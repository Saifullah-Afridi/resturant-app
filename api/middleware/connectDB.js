const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("connect to database successfully");
    })
    .catch((err) => console.log(err.message));
};

module.exports = dbConnect;
