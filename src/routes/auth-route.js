const express = require("express");
const authController = require("../controllers/auth-controller");

const router = express.Router();

router.post("/login", authController.login);
router.post("/customerRegister", authController.customerRegister);
router.post("/employeeRegister", authController.employeeRegister);

module.exports = router;
