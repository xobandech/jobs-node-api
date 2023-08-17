const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors")

const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      throw new BadRequestError("Please provide name, email and password")
    }
    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({user})
};

const login = (req, res) => {
  res.send("login");
};

module.exports = {
  register,
  login,
};
