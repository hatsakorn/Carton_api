const { Package } = require("../models");

exports.getAllPackage = async (req, res, next) => {
  try {
    const allPackage = await Package.findAll();
    if (!allPackage) {
      createError("package not found", 400);
    }

    res.status(200).json({ allPackage });
  } catch (err) {
    next(err);
  }
};
