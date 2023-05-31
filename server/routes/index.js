const express = require("express");
const router = express.Router();

const customerRoute = require("./customer");
const motorcycleRoute = require("./motorcycle");
const transactionRoute = require("./transaction");
const serviceRoute = require("./service");
const { errorHandle } = require("../middlewares/errorHandlers");

router.use("/customers", customerRoute);
router.use("/motorcycles", motorcycleRoute);
router.use("/transactions", transactionRoute);
router.use("/services", serviceRoute);

router.use(errorHandle);

module.exports = router;
