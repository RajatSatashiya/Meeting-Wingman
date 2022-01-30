const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");

router.post("/", async (req, res) => {
  try {
    const user = await findByCredentials(req.body.email, req.body.password);
    const token = await generateToken(user);
    res.send({ user, token });
  } catch (e) {
    res.status(400).json({
      message: "Wrong Credentials!!!",
    });
  }
});

const findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("can't find user");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw new Error("Unable to login");
  }
  return user;
};
const generateToken = async (user) => {
  const medUser = User(user);
  const token = jwt.sign(
    { _id: medUser._id.toString() },
    process.env.JWT_SECRET
  );
  // stuUser.tokens = stuUser.tokens.concat({ token });
  medUser.tokens = [{ token }];
  await medUser.save();
  return token;
};

module.exports = router;
