const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDB = require("./middleware/connectDB");

const app = require("./app");

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});
connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("The server is listening on port" + " " + port);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});