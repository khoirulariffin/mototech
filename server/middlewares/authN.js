const { Customer } = require("../models");
const { verifyToken } = require("../helpers/helper");

const authenticateCustomer = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "InvalidToken" };
    }
    console.log(access_token);

    const verify = verifyToken(access_token);

    const IdCustomer = verify.id;

    const customer = await Customer.findByPk(IdCustomer);
    if (!customer) {
      throw { name: "InvalidToken" };
    }

    req.customer = customer;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authenticateCustomer,
};
