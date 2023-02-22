const { Invoice, Items, Shelf, Warehouse } = require("../models");
const createError = require("../utils/create-error");

exports.getMainCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const mainCustomer = await Invoice.findAll({
      where: {
        customerId: customerId
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

    res.status(200).json({ mainCustomer });
  } catch (err) {
    next(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
