const express = require("express");
const authController = require("../controllers/auth-controller");

const router = express.Router();

router.post("/customerRegister", authController.customerRegister);

module.exports = router;
