const express = require("express");
const router = express.Router();
const customerdata = require("../models/userDetail");
const order = require("../models/totalRecord");
const { body, check, validationResult } = require("express-validator");
router.get("/v1/customers", async (req, res) => {
  //console.log(req.body);
  try {
    let user = await customerdata.find().sort({ FirstName: -1 });
    res.json(user);
    // res.send("data has sent already");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/v1/customers/:id", async (req, res) => {
  try {
    // await customerdata.findById(req.params.id);
    res.json(await customerdata.findById(req.params.id));
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
});
router.post(
  "/v1/customers",
  [
    body("firstName").not().isEmpty().isLength({ max: 20 }).isAlpha(),
    body("lastName").not().isEmpty().isLength({ max: 12 }).isAlpha(),
    body("emailAddress").not().isEmpty().isEmail(),
    body("city").isString(),
    body("dateofBirth").isString(),
    body("address").isString(),
    body("state").isString(),
    body("zipCode")
      .not()
      .isEmpty()
      .isInt()
      .isPostalCode("IN")
      .withMessage("is not valid idaho zip code"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    customerdata
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAdress: req.body.emailAddress,
        city: req.body.city,
        dateofBirth: req.body.dateofBirth,
        address: req.body.address,
        state: req.body.state,
        zipCode: req.body.zipCode,
        foodName: req.body.foodName,
      })
      .then((user) => res.status(201).json(user))
      .catch((user) => res.status(500).json(user));
  }
);
router.put("/v1/customers/:id", async (req, res) => {
  if (req.body._id != req.params.id) {
    return res
      .status(400)
      .send({ error: "ID in the body is not matching ID in the URL" });
    //delete req.body._id;
  }
  try {
    let updaterecord = await customerdata.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.json(updaterecord);
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
});
router.patch("/v1/customers/:id", async (req, res) => {
  if (req.body._id && req.body._id != req.params.id)
    return res
      .status(400)
      .json({ error: "ID in the body is not matching ID in the URL" });
  delete req.body._id;
  try {
    let updatecustomerDetail = await customerdata.updateOne(
      { _id: req.params.id },
      { $set: { emailAdress: req.body.emailAddress } }
    );
    res.json(updatecustomerDetail);
  } catch (err) {
    res.status(400).json({ msg: err.msg });
  }
});

router.delete("/v1/customers/:id", async (req, res) => {
  try {
    const removerecord = await customerdata.remove({ _id: req.params.id });
    res.json({ msg: "removed record by id" });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;
