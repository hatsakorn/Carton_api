const { Warehouse, Shelf, Items } = require("../models");
const createError = require("../utils/create-error");

exports.getAvailShelf = async (req, res, next) => {
  try {
    const availShelf = await Warehouse.findAll({
      include: [
        {
          model: Shelf,
          include: [
            {
              model: Items
            }
          ]
        }
      ]
    });

    res.status(200).json(availShelf);
  } catch (err) {
    next(err);
  }
};
