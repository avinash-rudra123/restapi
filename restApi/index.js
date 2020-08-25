const express = require("express");
const app = express();
const useroutes = require("./routes/userRoute.js");
const userOrder = require("./routes/orderRoute.js");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
var log4js = require("log4js");
const port = process.env.PORT || 3206;
mongoose.connect("mongodb://localhost:27017/test", {
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/api", useroutes);
app.use("/api/v1/customers", userOrder);
app.use(express.json());
app.listen(port, () => {
  console.log("server listing on port:,${port}");
});
