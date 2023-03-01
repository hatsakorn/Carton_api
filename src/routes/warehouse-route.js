const express = require("express");
const warehouseController = require("../controllers/warehouse-controller");

const router = express.Router();

router.get("/shelf", warehouseController.getAvailShelf);
router.get("/:warehouseId", warehouseController.getItemsByWarehouseId);

module.exports = router;
