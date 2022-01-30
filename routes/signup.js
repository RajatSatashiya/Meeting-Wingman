const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  console.log(req);
  const user = User(req.body);
  user.password = await bcrypt.hash(req.body.password, 10);
  try {
    await user.save();
    const token = await generateToken(user);
    res.status(201).send({ user, token });
  } catch (e) {
    console.log("An error: " + e);
    res.status(400).json({
      message: "username/email should be unique",
    });
  }
});

const generateToken = async (user) => {
  const medUser = User(user);
  const token = jwt.sign(
    { _id: medUser._id.toString() },
    process.env.JWT_SECRET
  );
  medUser.tokens = medUser.tokens.concat({ token });
  // stuUser.tokens = { token };
  await medUser.save();
  return token;
};
module.exports = router;
