const { Invoice, Items } = require("../models");
const createError = require("../utils/create-error");

exports.getInvoiceById = async (req, res, next) => {
  try {
    const myInvoice = await Invoice.findAll({
      where: {
        customerId: req.user.id
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

////////////////////////////////////////////////////////////////////////////////////

exports.getAllInvoiceByAdmin = async (req, res, next) => {
  try {
    const invoice = await Invoice.findAll({
      include: [
        {
          model: Items
        }
      ]
    });
    if (!invoice) {
      createError("invoice not found", 400);
    }

    res.status(200).json({ invoice });
  } catch (err) {
    next(err);
  }
};
