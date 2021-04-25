const { User } = require("../models/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {

    const user = await User.findOne({ username: req.body.username });
    console.log('authJS:', user);
    if (!user) {
      res.status(400).send('Login failed.');
      return null;
    } 
    
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).send('Login failed');
    }

    if (user) {
      const token = user.generateAuthToken();
      res.status(200).send(token);
    }
});

module.exports = router;
