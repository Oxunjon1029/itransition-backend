const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");


const validateSignUpRequest = [
check("name").notEmpty().withMessage("Name is required"),
check("email").isEmail().withMessage("Valid Email required"),
check("password")
   .isLength({ min: 1 })
   .withMessage("Password must be at least 1 character long"),
];
const validateSignIpRequest = [
check("email").isEmail().withMessage("Valid Email required"),
check("password")
    .isLength({ min: 1 })
    .withMessage("Password must be at least 1 character long"),
]
const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
 
  if (errors.array().length > 0) {
      return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ error: errors.array()[0].msg });
  }
  next();
};
module.exports = {
  validateSignUpRequest,
  isRequestValidated,
  validateSignIpRequest,
};