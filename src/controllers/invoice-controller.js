const { Invoice, Items } = require("../models");
exports.CreateInvoice = async (req, res, next) => {
  try {
    const value = req.body;
    const customerId = req.user.id;
    const newInvoice = await Invoice.create({
      customerId,
      status: "PENDING"
    });
    if (!newInvoice)
      return res.status(400).json({ error: "Falied to create invoice" });
    try {
      const itemsData = value.map((obj) => {
        return {
          invoiceId: newInvoice.id,
          details: obj.details,
          contractStartDate: obj.contractStartDate,
          contractEndDate: obj.contractEndDate,
          packageId: obj.packageId
        };
      });
      console.log(itemsData);
      const items = await Items.bulkCreate(itemsData);
      if (items.length === 0) {
        await newInvoice.destroy();
        return res.status(400).json({ error: "No items in invoice" });
      }
    } catch (err) {
      await newInvoice.destroy();
      return res.status(400).json({ error: "Failed to create items" });
    }
    res.status(201).json({ message: "Invoice has been created" });
  } catch (err) {
    next(err);
  }
};
