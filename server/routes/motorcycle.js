const express = require("express");
const { MotorcycleController } = require("../controllers/motorcycleController");
const router = express.Router();

router.post("/", MotorcycleController.GetAllMotorcycles);
router.get("/available", MotorcycleController.GetAvailableMotorcycles);
router.get("/pricelists", MotorcycleController.GetMotorcyclePriceLists);
router.get("/:model", MotorcycleController.GetMotorcycle);

module.exports = router;
