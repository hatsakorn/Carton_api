const express = require("express");
const adminController = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", adminController.getAllAdmin);
router.get("/items/", adminController.getItemsAdmin);
router.get("/items/nullShelf", adminController.getItemsNullShelf);
router.post("/createTask", adminController.createTask);
router.patch("/:taskId", adminController.updateTask);

module.exports = router;
