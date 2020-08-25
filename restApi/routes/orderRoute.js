const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const customerdata = require("../models/userDetail");
const order = require("../models/totalRecord");
router.get("/orders", (req, res) => {
  order
    .find()
    // .select("orderName _id")
    .populate("foodName", "city", "address")
    .exec()
    .then((orders) => {
      res.status(200).json({
        orders,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
router.post("/orders", function (req, res) {
  order.userOrder
    .create(req.body)
    .then(function (dbOrder) {
      res.json(dbOrder);
    })
    .catch(function (err) {
      res.json(err);
    });
});
router.post("/orders/:id", function (req, res) {
  order.userDetail
    .create(req.body)
    .then(function (db) {
      return order.userDetail.findOneAndUpdate(
        { _id: req.params.id },
        { price: db.price },
        { qty: db.qty },
        { new: true }
      );
    })
    .then(function (dbProduct) {
      res.json(dbProduct);
    })
    .catch(function (err) {
      res.json(err);
    });
});
router.get("/:id", (req, res) => {
  Order.findById(req.params.id)
    .populate("CustomerRecord")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      res.status(200).json({
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
router.delete("/:id", (req, res) => {
  Order.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Order deleted",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
