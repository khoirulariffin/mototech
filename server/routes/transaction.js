const express = require("express");
const {
  TransactionController,
} = require("../controllers/transactionController");
const { authenticateCustomer } = require("../middlewares/authN");
const { customerAuthorized } = require("../middlewares/authZ");
const router = express.Router();

router.get("/", authenticateCustomer, TransactionController.GetAllTransaction);
router.post(
  "/createInvoice",
  authenticateCustomer,
  TransactionController.CreateInvoice
);
router.get(
  "/checkInvoice/:invoiceID",
  authenticateCustomer,
  TransactionController.CheckInvoice
);
router.patch(
  "/payInvoice/:id",
  authenticateCustomer,
  customerAuthorized,
  TransactionController.UpdateInvoice
);

module.exports = router;
