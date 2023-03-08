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
    // if (req.user.role !== "ADMIN") {
    //   createError("you are not admin", 400);
    // }
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
    // if (req.user.role !== "ADMIN") {
    //   createError("you are not admin", 400);
    // }
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
    // if (req.user.role !== "ADMIN") {
    //   createError("you are not admin", 400);
    // }
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
    // if (req.user.role !== "ADMIN") {
    //   createError("you are not admin", 400);
    // }
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
    console.log(req.user.role);
    // if (req.user.role !== "ADMIN") {
    //   createError("you are not admin", 400);
    // }
    const employee = await Employee.findAll({});
    res.status(201).json({ employee });
  } catch (err) {
    next(err);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getTaskEmployee = async (req, res, next) => {
  try {
    // if (req.user.role !== "EMPLOYEE") {
    //   createError("you are not admin", 400);
    // }
    const taskemployee = await Task.findAll({
      where: {
        employeeId: req.user.id
      }
    });

    // if (!taskemployee) {
    //   createError("taskemployee not found", 400);
    // }

    res.status(200).json({ taskemployee });
  } catch (err) {
    next(err);
  }
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.updateDateIn = async (req, res, next) => {
  const {itemId} = req.body;

  Items.update({ dateIn: new Date(Date.now()) }, {
    where: {
      id: itemId
    }
  })  
  .then(numRowsAffected => {
    console.log(`${numRowsAffected} rows updated.`);
    if (numRowsAffected >0) {
      res.status(200).json({message: "date in complete"})
    }
  })
  .catch(error => {
    console.error('Error updating item:', error);
  });
};

exports.updateDateOut = async (req, res, next) => {
  const {itemId} = req.body;

  Items.update({ dateOut: new Date(Date.now()) }, {
    where: {
      id: itemId
    }
  })  
  .then(numRowsAffected => {
    console.log(`${numRowsAffected} rows updated.`);
    if (numRowsAffected >0) {
      res.status(200).json({message: "date in complete"})
    }
  })
  .catch(error => {
    console.error('Error updating item:', error);
  });
};