const { Invoice, Items } = require("../models");
exports.CreateReservation = async (req, res, next) => {
  try {
    const value = req.body;
    const customerId = req.customer.id;
    const newInvoice = await Invoice.create({ customerId });
    if (!newInvoice)
      return res.status(400).json({ error: "Falied to create invoice" });
    try {
      const items = await Items.bulkCreate(value);
    } catch (err) {
      await newInvoice.destroy();
      return res.status(400).json({ error: "Failed to create items" });
    }
    res.status(201).json({ message: "Reservation has created" });
  } catch (err) {
    next(err);
  }
};
