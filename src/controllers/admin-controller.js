const {
  Task,
  Items,
  Shelf,
  Warehouse,
  Invoice,
  Customer,
  Employee
} = require("../models");
const createError = require("../utils/create-error");

exports.getAllAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "ADMIN" && "EMPLOYEE") {
      createError("you are not admin", 400);
    }
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
    if (req.user.role !== "ADMIN" && "EMPLOYEE") {
      createError("you are not admin", 400);
    }
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
    if (req.user.role !== "ADMIN" && "EMPLOYEE") {
      createError("you are not admin", 400);
    }
    const { employeeId, itemId, shelf, status, task } = req.body;

    const newtask = await Task.findOne({
      where: {
        itemId: itemId
      }
    });
    if (newtask) {
      createError("This item is already in the shelf.", 400);
    }

    await Task.create({
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
    // if (!req.user.role) {
    //   createError("you are not admin", 400);
    // }
    const { taskId } = req.params;
    const { status, task, employeeId } = req.body;

    await Task.update(
      { status: status, employeeId: employeeId, task: task },

      { where: { Id: taskId } }
    );

    //------------------------  REJECT --------------------//

    if (status === "REJECT") {
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
      await Items.update({ shelfId: null }, { where: { Id: task.itemId } });

      await Shelf.update(
        { isAvailable: "0" },

        { where: { Id: item.shelfId } }
      );
    }

    //------------------------  COMPLETE --------------------//
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
    if (!req.user.role) {
      createError("you are not admin", 400);
    }
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

exports.getEmployee = async (req, res, next) => {
  try {
    if (!req.user.role) {
      createError("you are not admin", 400);
    }
    const employee = await Employee.findAll({});
    res.status(201).json({ employee });
  } catch (err) {
    next(err);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getTaskEmployee = async (req, res, next) => {
  try {
    if (!req.user.role) {
      createError("you are not admin", 400);
    }
    const taskemployee = await Task.findAll({
      where: {
        employeeId: req.user.id
      }
    });

    res.status(200).json({ taskemployee });
  } catch (err) {
    next(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deleteEmployeeById = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    if (!req.user.role) {
      createError("you are not admin", 400);
    }

    const employee = await Manga.destroy({
      where: {
        id: employeeId
      }
    });
    if (!employee) {
      createError("manga not found", 400);
    }

    res.status(200).json({ message: "deleteManga success. " });
  } catch (err) {
    next(err);
  }
};
