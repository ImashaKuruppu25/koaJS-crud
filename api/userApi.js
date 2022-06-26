const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let message, status;

const register = async (ctx) => {
  try {
    const user = ctx.request.body;

    const { fName, lName, phone, age, email, password } = user;

    if (!fName || !lName || !age || !email || !password) {
      message = "fill all fields!";
      status = 400;
    } else {
      //check db
      const existUser = await User.findOne({ email });
      if (existUser) {
        message = "user already registerd!";
        status = 400;
      } else {
        //create user object
        const newUser = new User({
          "name.fName": fName,
          "name.lName": lName,
          phone,
          email,
          password,
          age,
        });

        //save user object
        await newUser.save();
        message = "registerd successfully!";
        status = 200;
      }
    }
  } catch (error) {
    message = error;
    status = 500;
  }

  //return
  ctx.body = message;
  ctx.status = status;
};

const login = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await User.findOne({ email });

    if (!user) {
      message = "user not found!";
      status = 400;
    } else {
      if (user.password == password) {
        const accessToken = createAccessToken({ _id: user._id });
        message = { msg: "login completed!", accessToken };
        status = 200;
      } else {
        message = "password incorrect";
        status = 400;
      }
    }
  } catch (error) {
    message = error;
    status = 500;
  }

  ctx.body = message;
  ctx.status = status;
};

const getUserDetails = async (ctx) => {
  try {
    const user = await User.findById(ctx.request.user._id);

    message = user;
    status = 200;
  } catch (error) {
    message = error;
    status = 500;
  }
  ctx.body = message;
  ctx.status = status;
};

const getAllDetails = async (ctx) => {
  try {
    const users = await User.find();
    message = users;
    status = 200;
  } catch (error) {
    message = error;
    status = 500;
  }
  ctx.body = message;
  ctx.status = status;
};

const updateUser = async (ctx) => {
  try {
    const { fName, lName, age, phone } = ctx.request.body;
    const user = await User.findByIdAndUpdate(
      ctx.request.user._id,
      {
        "name.fName": fName,
        "name.lName": lName,
        age: age,
        phone: phone,
      },
      (err, result) => {
        if (err) {
          message = err;
          status = 400;
        } else {
          message = result;
          status = 200;
        }
      }
    );
  } catch (error) {
    message = error;
    status = 500;
  }

  ctx.body = message;
  ctx.status = status;
};

//genarate token
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESSTOKEN, { expiresIn: "1h" });
};
module.exports = { register, login, getUserDetails, getAllDetails, updateUser };
