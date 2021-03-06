const { User } = require("../models/userModel.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) 
    res.status(400).send('Login failed.');
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) 
    res.status(400).send('bad request. Login failed');

    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;
