const express = require("express");
const invoiceController = require("../controllers/invoice-controller");

const router = express.Router();

router.get("/getInvoice", invoiceController.getInvoiceById);
router.get("/", invoiceController.getAllInvoiceByAdmin);

module.exports = router;
