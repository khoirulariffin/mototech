const { Transaction } = require("../models");

const customerAuthorized = async (req, res, next) => {
  try {
    const { id } = req.customer;

    const transactions = await Transaction.findOne({
      where: {
        IdCustomer: id,
      },
    });

    if (transactions.IdCustomer !== id) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  customerAuthorized,
};
