const express = require("express");
const invoiceController = require("../controllers/invoice-controller");

const router = express.Router();

router.get("/:customerId", invoiceController.getInvoiceById);
router.get("/", invoiceController.getAllInvoiceByAdmin);

module.exports = router;
