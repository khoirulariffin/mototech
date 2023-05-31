const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const salt = bcrypt.genSaltSync(10);
const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt);
};

const checkPassword = (plain, hash) => {
  return bcrypt.compareSync(plain, hash);
};

const signToken = (token) => {
  return jwt.sign(token, SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  hashPassword,
  checkPassword,
  signToken,
  verifyToken,
};
