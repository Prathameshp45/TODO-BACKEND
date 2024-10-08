const mongoose = require("mongoose");
const usermodel = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  console.log(req.body);
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    confirmPassword,
    createdAt,
  } = req.body;

  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      const image = req.file ? req.file.filename : null;
      const newUser = new usermodel({
        firstname,
        lastname,
        username,
        email,
        password,
        image,
        createdAt: Date.now(),
      });

      await newUser.save();

      res
        .status(201)
        .send({ message: "User registered successfully", success: true });
    } else {
      res.status(400).send({ error: "User already exists", success: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message, success: false });
  }
}

//  Login 

async function login(req, res) {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await usermodel.findOne({ username });
    if (!user || !(await user.comparepassword(password))) {
      return res.status(400).send({ error: "Invalid username or Password" });
    }
    const token = jwt.sign({ _id: user._id }, "key", {
      expiresIn: "1h",
    });
    res.status(200).send({ user: user, access: token, success: true });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
}

async function userinfo(req, res) {
  console.log("****", req.user);
  const id = req.user._id;
  try {
    const user = await usermodel.findById(id);
    console.log(user);
    if (!user) {
      res.status(404).send({ msg: "User does not found", success: false });
    } else {
      res.status(201).send({ user: user, success: true });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// ...................................... Get All Users ...................................
async function getAllUsers(req, res) {
  try {
    const users = await usermodel.find();
    if (!users.length) {
      return res.status(404).send({ msg: "No users found", success: false });
    }
    res.status(200).send({ users, success: true });
  } catch (error) {
    res.status(500).send({ error: error.message, success: false });
  }
}

module.exports = {
  register,
  login,
  userinfo,
  getAllUsers,
};