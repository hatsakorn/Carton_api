const express = require("express");
const invoiceController = require("../controllers/invoice-controller");
const passportAuthen = require("../middlewares/passportAuthentication");

const router = express.Router();

router.get("/getInvoice", invoiceController.getInvoiceById);
router.post("/create", passportAuthen, invoiceController.CreateInvoice);
router.get("/", passportAuthen, invoiceController.GetInvoiceByUserId);
router.post("/qrcode",invoiceController.getItemsLocationByItemIdAndCustomerId);
router.post("/:invoiceId", invoiceController.Omise);
router.get("/:customerId", invoiceController.getInvoiceById);
router.get("/", invoiceController.getAllInvoiceByAdmin);


module.exports = router;
