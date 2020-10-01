const mongoose = require("mongoose");
const customer = new mongoose.Schema({
  firstName: {
    type: String,
    ref: "order",
    required: true,
  },
  lastName: {
    type: String,
    ref: "order",
    required: true,
  },
  emailAdress: {
    type: String,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        //validation for emailId format
  },
  city: {
    type: String,
    required: true,
  },
  dateofBirth: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("detail", customer);
