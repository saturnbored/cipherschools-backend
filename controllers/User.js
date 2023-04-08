const asyncHandler = require("express-async-handler");
const generateToken = require("../config/Token");
const User = require("../models/User");

// @desc    Register a new user
const register = asyncHandler(async (req, res) => {
  let { firstName, lastName, email, password, mobileNumber } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields.");
  }

  if(!mobileNumber){
    mobileNumber = -1;
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await User.create({
    name: {
      firstName,
      lastName,
    },
    email,
    password,
    mobileNumber,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error("Failed to create the user.");
  }
});

// @desc    Auth user & get token
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Could not verify user.");
  }
});

module.exports = {
  register,
  login,
};
