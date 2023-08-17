const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors");
const { genSalt, hash } = require("bcryptjs");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ user });
};

const login = (req, res) => {
  res.send("login");
};

module.exports = {
  register,
  login,
};
