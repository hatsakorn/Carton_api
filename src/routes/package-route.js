const express = require("express");
const packageController = require("../controllers/package-controller");

const router = express.Router();

router.get("/", packageController.getAllPackage);

module.exports = router;
