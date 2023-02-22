const express = require("express");
const customerController = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/:employeeId", customerController.getMainAdminById);

module.exports = router;
