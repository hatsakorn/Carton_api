const express = require("express");
const invoiceController = require("../controllers/invoice-controller");
const passportAuthen = require("../middlewares/passportAuthentication");

const router = express.Router();

router.post("/create", passportAuthen, invoiceController.CreateInvoice);
router.get("/", passportAuthen, invoiceController.GetInvoiceByUserId);
router.post("/:invoiceId", invoiceController.Omise);

module.exports = router;
