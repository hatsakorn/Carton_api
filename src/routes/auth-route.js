const express = require("express");
const authController = require("../controllers/auth-controller");
const passportAuthen = require("../middlewares/passportAuthentication");
const router = express.Router();

router.post("/login", authController.login);
router.post("/customerRegister", authController.customerRegister);
router.post("/employeeRegister", authController.employeeRegister);
router.get("/me", passportAuthen, authController.getMe);

module.exports = router;
