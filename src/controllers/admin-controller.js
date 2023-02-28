const {
  Task,
  Items,
  Shelf,
  Warehouse,
  Invoice,
  Customer
} = require("../models");
const createError = require("../utils/create-error");

exports.getAllAdmin = async (req, res, next) => {
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

exports.getItemsAdmin = async (req, res, next) => {
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

////////////////////////////////////////////////////////////////////////////////////////////////

exports.createTask = async (req, res, next) => {
  try {
    const { employeeId, itemId, shelf, status, task } = req.body;

    const newtask = await Task.findOne({
      where: {
        itemId: itemId
      }
    });
    if (newtask) {
      createError("This item is already in the shelf.", 400);
    }

    const createtask = await Task.create({
      task: task,
      status: status,
      employeeId: employeeId,
      itemId: itemId
    });

    await Items.update(
      { shelfId: shelf },

      { where: { Id: itemId } }
    );
    await Shelf.update(
      { isAvailable: "1" },

      { where: { Id: shelf } }
    );

    res.status(200).json({ mes: "success" });
  } catch (err) {
    next(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////

exports.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { status, task, employeeId } = req.body;

    await Task.update(
      { status: status, employeeId: employeeId, task: task },

      { where: { Id: taskId } }
    );

    if (status === "COMPLETE") {
      const task = await Task.findOne({
        where: {
          Id: taskId
        }
      });

      const item = await Items.findOne({
        where: {
          Id: task.itemId
        }
      });

      await Shelf.update(
        { isAvailable: "0" },

        { where: { Id: item.shelfId } }
      );
    }

    res.status(200).json({ mes: "update success" });
  } catch (err) {
    next(err);
  }
};
///////////////////////////////////////////////////////////////////////////////////////////

exports.getItemsNullShelf = async (req, res, next) => {
  try {
    const ItemsNullShelf = await Items.findAll({
      where: {
        shelfId: null
      }
    });
    if (!ItemsNullShelf) {
      createError("ItemsNullShelf not found", 400);
    }

    res.status(200).json({ ItemsNullShelf });
  } catch (err) {
    next(err);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////
