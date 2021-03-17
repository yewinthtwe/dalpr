const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const { Price } = require("../models/priceModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res ) => {
  try {
      const price = await Price.find();
      res.status(200).send(price);
  } catch (ex) {
      console.log('priceJS: Error.', ex);
  }
});

router.put("/:id", [auth], async (req, res) => {
  console.log('priceJS: update price:', req.body);
    const price = await Price.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        rate: req.body.rate,
        billingCircle: req.body.billingCircle,
        discountEntitleMinutes: req.body.discountEntitleMinutes,
        discountPercent: req.body.discountPercent,
        discountedRate: req.body.discountedRate,
        status: req.body.status,
      },
      {new: true}
    );
    if (!price)
      return res.status(404).send("priceJS: The price with the given ID was not found.");
    res.send(price);
});

router.post("/", auth, async (req, res) => {
  console.log('priceJS: Add price:', req.body );
  let price = await Price.findOne({ name: req.body.name });
  if (price) return res.status(400).send("priceJS: Price name already registered.");
  price = new Price(_.pick(req.body, ["name", "rate", "billingCircle", "discountEntitleMinutes", "discountPercent", "discountedRate"]));
  await price.save();
  res.status(200).send(_.pick(price, ["name", "rate", "billingCircle", "discountEntitleMinutes", "discountPercent", "discountedRate"]));
});

router.delete("/:id", [auth, isAdmin],async (req, res) => {
  console.log('priceJS: Delete price:', req.body );
  const price = await Price.findByIdAndRemove(req.params.id);
  if(!price)
  return res.status(404).send("The give id was not found.");
  res.send(price);
});

module.exports = router;
