const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDB = require("./middleware/connectDB");

const app = require("./app");

connectDB();

const port = 3000;

app.listen(port, () => {
  console.log("connected");
});
