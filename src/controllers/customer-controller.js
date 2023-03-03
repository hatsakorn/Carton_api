const { Invoice, Items, Shelf, Warehouse } = require("../models");
const createError = require("../utils/create-error");

exports.getMainCustomer = async (req, res, next) => {
  // // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");
  // console.log(req.user.constructor.name === "Customer" ? "y" : "n");
  // // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");
  // if (!req.user.constructor.name === "Customer") {
  //   createError("you are not admin", 400);
  // }
  try {
    const mainCustomer = await Invoice.findAll({
      where: {
        customerId: req.user.id
      },
      include: [
        {
          model: Items,
          include: [
            {
              model: Shelf,
              include: [
                {
                  model: Warehouse
                }
              ]
            }
          ]
        }
      ]
    });
    if (!mainCustomer) {
      createError("mainPackage not found", 400);
    }

    res.status(200).json({mainCustomer});
  } catch (err) {
    next(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
