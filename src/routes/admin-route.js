const express = require("express");
const adminController = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", adminController.getMainAdmin);
router.get("/task/", adminController.getTaskAdmin);
router.post("/createTask", adminController.createTask);

// router.post("/assignTask", adminController.postAssignTask);

module.exports = router;
