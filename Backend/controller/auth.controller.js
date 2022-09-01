const { validationResult } = require("express-validator");
const User = require("../model/User.model");

const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const bcrypt = require("bcrypt");

const saltRounds = 11;

let loginController = async (req, res) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ info: error.array(), type: "error" });
  }
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ info: "Incorrect user name or passwrod", type: "error" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ info: "Incorrect user name or passwrod", type: "error" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      keys.jwtPrivate,
      { expiresIn: "10h" }
    );

    return res.status(200).json({
      info: "Auth Success / Token Issued",
      token,
      type: "data",
    });
  } catch (error) {
    res.status(500).json({ info: "internal server error", type: "error" });
    console.log(error);
  }
};

let registerController = async (req, res) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ info: error.array(), type: "error" });
  }
  try {
    let { email, name, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(403)
        .json({ info: "Email already existed", type: "error" });
    }

    password = await bcrypt.hash(password, saltRounds);
    let createOn = new Date();
    user = new User({ name, email, password, createOn });
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      keys.jwtPrivate,
      { expiresIn: "10h" }
    );

    return res.status(200).json({
      info: "Auth Success / Token Issued",
      token,
      type: "data",
    });
  } catch (error) {
    res.status(500).json({ info: "internal server error", type: "error" });
    console.log(error);
  }
};

let userController = async (req, res) => {
  try {
    let { userId } = req;
    let user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(403).json({ info: "Auth error", type: "error" });
    }
    res.status(200).json({ info: user, type: "data" });
  } catch (error) {
    res.status(500).json({ info: "internal server error", type: "error" });
    console.log(error);
  }
};

module.exports = { loginController, registerController, userController };
