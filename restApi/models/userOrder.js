const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  foodName: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  orderName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerRecord",
  },
});

var orderStore = mongoose.model("order", orderSchema);
module.exports = orderStore;
