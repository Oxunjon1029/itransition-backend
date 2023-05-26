const { StatusCodes } = require("http-status-codes");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }

  const hash_password = await bcrypt.hash(password, 10);

  const userData = {
    name,
    email,
    hash_password,
  };

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
      });
    } else {
      User.create(userData).then((data, err) => {
        if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
        else
          res
            .status(StatusCodes.CREATED)
            .json({ message: "User created Successfully" });
      });
    }
  } catch (error) {
    if (error) res.status(StatusCodes.BAD_REQUEST).json({ error })
  }
};

const signIn = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.authenticate(req.body.password) && user.status === 'active') {
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_TIME });
        const { _id, name, email, status, lastLoginTime, lastRegistrationTime } = user;
        res.status(StatusCodes.OK).json({
          token,
          user: { _id, name, email, status, lastLoginTime, lastRegistrationTime },
        });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "This user is unauthorized or blocked!",
        });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist..!",
      });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};
module.exports = { signUp, signIn };