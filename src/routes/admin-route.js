const express = require("express");
const customerController = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", customerController.getMainAdmin);
router.get("/task/", customerController.getTaskAdminByIdAndBody);

module.exports = router;
