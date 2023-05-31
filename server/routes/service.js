const express = require("express");
const { ServiceController } = require("../controllers/serviceController");
const router = express.Router();

router.post("/", ServiceController.GetAllServices);
router.get("/all", ServiceController.AllServices);
router.get("/:id", ServiceController.GetServiceById);

module.exports = router;
