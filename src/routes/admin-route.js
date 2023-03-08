const express = require("express");
const adminController = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", adminController.getAllAdmin);
router.get("/items/", adminController.getItemsAdmin);
router.get("/items/nullShelf", adminController.getItemsNullShelf);
router.post("/createTask", adminController.createTask);
router.patch("/:taskId", adminController.updateTask);
router.get("/employee", adminController.getEmployee);
router.get("/employee/task", adminController.getTaskEmployee);
router.post("/employee/qrcode/in",adminController.updateDateIn);
router.post("/employee/qrcode/out",adminController.updateDateOut);

module.exports = router;
