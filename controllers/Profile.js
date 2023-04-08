const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc    Get user profile details
const getDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, {
    password: 0,
    followers: 0,
    __v: 0,
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// @desc    Update user profile details
const updateDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, {
    password: 0,
    followers: 0,
    __v: 0,
  });

  if (user) {
    user.name.firstName = req.body.firstName || user.name.firstName;
    user.name.lastName = req.body.lastName || user.name.lastName;
    user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
    user.pic = req.body.pic || user.pic;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// @desc    Update user profile interests
const updateInterests = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, {
    password: 0,
    followers: 0,
    __v: 0,
  });
  if (user) {
    user.interests = req.body.interests || user.interests;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// @desc    Update user profile password
const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, {
    followers: 0,
    __v: 0,
  });
  if (user && req.body.currentPassword && req.body.newPassword) {
    if (await user.matchPassword(req.body.currentPassword)) {
      user.password = req.body.newPassword;
      const updatedUser = await user.save();
      const userToReturn = await User.findById(req.user._id, {
        password: 0,
        followers: 0,
        __v: 0,
      });
      res.status(200).json(userToReturn);
    } else {
      res.status(401);
      throw new Error("Incorrect password.");
    }
  } else {
    res.status(400);
    throw new Error("User not found or password not provided.");
  }
});

module.exports = {
  getDetails,
  updateDetails,
  updateInterests,
  updatePassword,
};
