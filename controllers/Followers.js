const express = require("express");
const asyncHandler = require("express-async-handler");

const User = require("../models/User");

const getFollowers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, {
    password: 0,
    __v: 0,
  }).populate("followers", "name pic followerCount");
  res.status(200).json(user.followers);
});

const addFollower = asyncHandler(async (req, res) => {
  const { followerId } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { followers: followerId },
      $inc: { followerCount: 1 },
    },
    { new: true }
  );
  res.json(user.followerCount);
});

module.exports = {
  getFollowers,
  addFollower,
};
