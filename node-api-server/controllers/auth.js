const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors/");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({
      user: { name: user.getName(), email: user.email },
      token: user.createJWT(),
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new BadRequestError("Please provide email and password.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError(
        "User is not registered or Invalid Credentials."
      );
    }
    const isPasswordsMatch = await user.comparePasswords(password);
    if (!isPasswordsMatch) {
      throw new BadRequestError("Incorrect password or email");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.getName() }, token });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  register,
  login,
};
