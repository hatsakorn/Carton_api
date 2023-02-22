const express = require("express");
const packageController = require("../controllers/package-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", packageController.getAllPackage);
router.patch("/:packageId", packageController.patchStatusPackage);

router.post(
  "/",
  upload.fields([{ name: "posterUrl", maxCount: 1 }]),
  packageController.postPackage
);

module.exports = router;
