const { Invoice, Items } = require("../models");
exports.CreateInvoice = async (req, res, next) => {
  try {
    console.log(req)
    const value = req.body;
    const customerId = req.user.id;
    const newInvoice = await Invoice.create({ 
      customerId,
      status: "PENDING"
    });
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
