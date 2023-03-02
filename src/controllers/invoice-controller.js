const { Invoice, Items } = require("../models");
const createError = require("../utils/create-error");
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
        res.status(200).json({ message: "Invoice has been created" });}
        catch(err){
          next(err);
        }
};


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

exports.GetInvoiceByUserId = async (req,res,next) => {
  try {
    const userId = req.user.id
    const invoice = await Invoice.findAll({
      where: {
        customerId : userId
      }
    })
    if (!invoice) return res.status(400).json('fetched failed')
    return res.status(200).json({invoice})
  }catch (err){
    next(err);
  }
}

const omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY
});

exports.Omise = async (req, res, next) => {
  const { email, name, amount, token, invoiceId } = req.body;

  try {
    const customer = await omise.customers.create({
      email,
      description: name,
      card: token
    });

    const charge = await omise.charges.create({
      amount: amount,
      currency: "thb",
      customer: customer.id
    });

    // Import charge.id to database as transactionId
    const transactionId = charge.id;

    const [updatedCount, updatedInvoices] = await Invoice.update(
      { 
        transactionId: transactionId,
        status: 'PAID'
      },
      {
        where: { id: invoiceId },
        returning: true // This option will return the updated rows from the database
      }
    );

    if (updatedCount === 0) {
      return res.status(400).json({ message: 'Update failed' });
    }

    const updatedInvoice = updatedInvoices[0];

    return res.status(201).json({
      message: 'Transaction complete',
      transactionId: updatedInvoice.transactionId,
      status: updatedInvoice.status
    });

  } catch (err) {
    console.error(err);
    next(err);
  }
};


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
}