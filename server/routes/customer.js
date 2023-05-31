const express = require("express");
const { authenticateCustomer } = require("../middlewares/authN");
const { CustomerController } = require("../controllers/customerController");
const router = express.Router();

router.post("/register", CustomerController.registerCustomer);
router.post("/login", CustomerController.loginCustomer);
router.post("/googleLogin", CustomerController.loginGoogle);
router.get("/maps", authenticateCustomer, CustomerController.getMaps);
router.get("/detail", authenticateCustomer, CustomerController.detail);
router.put("/detail", authenticateCustomer, CustomerController.updateProfile);

module.exports = router;
