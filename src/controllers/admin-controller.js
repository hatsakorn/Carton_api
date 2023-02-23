const {
  Task,
  Items,
  Shelf,
  Warehouse,
  Invoice,
  Customer
} = require("../models");
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

exports.getTaskAdmin = async (req, res, next) => {
  try {
    const mainAdmin = await Items.findAll({
      include: [
        {
          model: Task
        },

        { model: Shelf, include: [{ model: Warehouse }] },

        { model: Invoice, include: [{ model: Customer }] }
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

///////////////////////////////////////////////////////////////////////////////////////////
// exports.postAssignTask = async (req, res, next) => {
//   try {
//     const mainAdmin = await Items.findAll({
//       include: [
//         {
//           model: Task
//         },

//         { model: Shelf, include: [{ model: Warehouse }] },

//         { model: Invoice, include: [{ model: Customer }] }
//       ]
//     });
//     if (!mainAdmin) {
//       createError("mainAdmin not found", 400);
//     }

//     res.status(200).json({ mainAdmin });
//   } catch (err) {
//     next(err);
//   }
// };
////////////////////////////////////////////////////////////////////////////////////////////////

exports.createTask = async (req, res, next) => {
  console.log("+++++++++++++++++++++++++++++++");
  console.log(req.body);
  console.log("+++++++++++++++++++++++++++++++");
  try {
    const { task, employeeId, itemId, shelf } = req.body;
    const newtask = await Task.findOne({
      where: {
        itemId: itemId
      }
    });
    if (newtask) {
      createError("Item is in progress", 400);
    }

    const status = "ASSIGN";

    const createtask = await Task.create({
      task: task,
      status: status,
      employeeId: employeeId,
      itemId: itemId
    });

    await Items.update(shelf, { where: { shelfId: shelf } });

    res.status(200).json({ mes: "112" });
  } catch (err) {
    next(err);
  }
};
