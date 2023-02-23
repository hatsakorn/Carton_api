const { Invoice } = require("../models");
const createError = require("../utils/create-error");

exports.getInvoiceById = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const myInvoice = await Invoice.findAll({
      where: {
        customerId: customerId
      }
    });
    if (!myInvoice) {
      createError("myInvoice not found", 400);
    }

    res.status(200).json({ myInvoice });
  } catch (err) {
    next(err);
  }
};
