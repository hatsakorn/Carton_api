const express = require("express");
const warehouseController = require("../controllers/warehouse-controller");

const router = express.Router();

router.get("/shelf", warehouseController.getAvailShelf);

module.exports = router;
