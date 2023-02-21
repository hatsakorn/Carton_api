const { Invoice, Item, Shelf, Warehouse } = require("../models");
const createError = require("../utils/create-error");

exports.getMainCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const mainPackage = await Invoice.findAll({
      where: {
        customerId: customerId
      },
      include: [
        {
          model: Item
        },
        {
          model: Shelf
        },
        {
          model: Warehouse
        }
      ]
    });
    if (!mainPackage) {
      createError("mainPackage not found", 400);
    }

    res.status(200).json({ mainPackage });
  } catch (err) {
    next(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
