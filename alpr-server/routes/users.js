const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, schema } = require("../models/userModel");


router.post("/", auth, async (req, res) => {
  const { error } = schema.validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["_id", "username", "password", "isAdmin","name" ]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res
  .header('x-auth-token', token)
  .header('access-control-expose-headers', "x-auth-token")
  .status(200).send(_.pick(user, ["_id", "username", "isAdmin", "reg_date", "name"]));
});

router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).send(user);
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send('Unexpected error');
    console.log("unexpected error retriving data", err);
  }
});

router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user)
  return res.status(404).send("The give id was not found.");
  res.send(user);
});

router.put("/:id", [auth], async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);
  
  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      password: newPassword,
      name: req.body.name,
      isAdmin: req.body.isAdmin
    },
  );
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

router.delete("/:id", [auth, isAdmin],async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if(!user)
  return res.status(404).send("The give id was not found.");
  res.send(user);
});


module.exports = router;
