const { Task, Items, Shelf, Warehouse } = require("../models");
const createError = require("../utils/create-error");

exports.getMainAdminById = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const mainAdmin = await Task.findAll({
      where: {
        employeeId: employeeId
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
    if (!mainAdmin) {
      createError("mainAdmin not found", 400);
    }

    res.status(200).json({ mainAdmin });
  } catch (err) {
    next(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
