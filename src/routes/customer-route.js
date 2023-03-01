const express = require("express");
const customerController = require("../controllers/customer-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/:customerId", customerController.getMainCustomer);

module.exports = router;
