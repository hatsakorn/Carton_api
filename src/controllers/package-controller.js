const fs = require("fs");
const { Package } = require("../models");
const createError = require("../utils/create-error");
const cloudinary = require("../utils/cloudinary");

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.postPackage = async (req, res, next) => {
  // console.log("++++++++++++++++++++++++++++++++");
  // console.log(req);
  // console.log("+++++++++++++++++++++++++++");
  try {
    const title = { title: req.body.title };
    const description = { description: req.body.description };
    const price = { price: req.body.price };
    const isActive = { isActive: req.body.isActive };
    const startDate = { startDate: req.body.startDate };
    const endDate = { endDate: req.body.endDate };
    const { posterUrl } = req.files;
    // console.log("*******************************");
    console.log(posterUrl);
    // console.log("*******************************");
    const posterUrlPublicId = posterUrl[0].path
      ? cloudinary.getPublicId(posterUrl[0].path)
      : null;

    const postpackage = await Package.findOne({
      where: {
        title: title.title
      }
    });
    if (postpackage) {
      createError("package  is already in use", 400);
    }

    const posterUrl2 = await cloudinary.upload(
      posterUrl[0].path,
      posterUrlPublicId
    );

    const createpackage = await Package.create({
      title: title.title,
      description: description.description,
      price: price.price,
      isActive: isActive.isActive,
      startDate: startDate.startDate,
      endDate: endDate.endDate,
      posterUrl: posterUrl2
    });

    res.status(201).json({ message: "postPackage success. " });
  } catch (err) {
    next(err);
  }
  //  finally {
  //   fs.unlinkSync(req.files.posterUrl[0].path);
  // }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.patchStatusPackage = async (req, res, next) => {
  try {
    const { packageId } = req.params;
    const { isActive } = req.body;
    await Package.update({ isActive: isActive }, { where: { id: packageId } });

    res.status(201).json({ message: "upstatus success. " });
  } catch (err) {
    next(err);
  }
};
