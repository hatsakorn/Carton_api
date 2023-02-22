const express = require("express");
const invoiceController = require("../controllers/invoice-controller");
const passportAuthen = require("../middlewares/passportAuthentication");

const router = express.Router();

router.post("/create", passportAuthen, invoiceController.CreateInvoice);

module.exports = router;
