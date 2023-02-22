const { Task, Items, Shelf, Warehouse, Invoice } = require("../models");
const createError = require("../utils/create-error");

exports.getMainAdmin = async (req, res, next) => {
  try {
    const mainAdmin = await Items.findAll({
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
    });
    if (!mainAdmin) {
      createError("mainAdmin not found", 400);
    }

    res.status(200).json({ mainAdmin });
  } catch (err) {
    next(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getTaskAdminByIdAndBody = async (req, res, next) => {
  try {
    const mainAdmin = await Task.findAll({
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
          ],
          include: [
            {
              model: Invoice
            }
          ]
        }
      ]
    });
    if (!mainAdmin) {
      createError("mainAdmin not found", 400);
    }

    res.status(200).json({ mainAdmin });
  } catch (err) {
    next(err);
  }
};
