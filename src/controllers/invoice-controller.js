const { Invoice, Items,Customer,Shelf,Warehouse } = require("../models");
const createError = require("../utils/create-error");
const Sequelize = require('sequelize');
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

exports.Omise = async( req, res, next) => {
  const { email, name, amount, token, invoiceId } = req.body 
  const omise = require('omise')({
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY
});
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

      //import charge.id to database as transcationId
      const transactionId = charge.id
      const invoice = await Invoice.update({ 
        transactionId : transactionId,
        status : 'PAID'
      },{
        where : { id : invoiceId }
      })
      if (!invoice) return res.status(400).json('fetched failed')
      return res.status(201).json({message : 'transaction complete'})

  } catch (err) {
      console.log(err)
      next(err)
  }
}



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

exports.getItemsLocationByItemIdAndCustomerId = async (req,res,next) => {
  const { invoiceId,customerId } = req.body;
  console.log('-----------------------')
  console.log(req.body)
  try {
    const item = await Customer.findAll({
      where: { id: customerId },
      include: [
        {
          model: Invoice,
          where: { id: invoiceId },
          include: [
            {
              model: Items,
              include: [
                {
                  model: Shelf,
                  include: [
                    {
                      model: Warehouse,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      attributes: [
        'first_name',
        [Sequelize.col('invoices.items.id'), 'item_id'],
        [Sequelize.col('invoices.items.shelf.id'), 'shelf'],
        [Sequelize.col('invoices.items.shelf.warehouse.location'), 'location'],
      ],
    });
    

    if (!item || item.length === 0) {
      createError("item not found", 400);
    }
    res.status(200).json(item)
  }catch(err){
    next(err)
  }
}