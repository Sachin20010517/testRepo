const InvoiceModel = require("../models/invoice-model");
const OrderModel = require("../models/order-model");
const JobModel = require("../models/job-model");

async function createInvoice(order) {
  try {
    const allInvoice = await InvoiceModel.find();
    const invoice = new InvoiceModel({
      invoice_no: "INV" + (allInvoice.length + 1),
      date: order.date,
      order_id: order._id,
      discount: 0,
      delivery_charges: 0,
      total: order.total,
      paidAmount: 0,
      balance: order.total,
      isCompleted: false,
    });
    const result = await invoice.save();
    if (!result) {
      return { status: 400, error: "Error while saving invoice" };
    } else {
      return { status: 200, result };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getAllInvoices() {
  try {
    const result = await InvoiceModel.find()
      .populate("order_id")
      .sort({ createdAt: -1 });
    if (!result) {
      return { status: 400, error: "Error while retrieving invoices" };
    } else {
      return { status: 200, result };
    }
  } catch (err) {
    return err;
  }
}
async function updateDeliveryAndDiscount(req) {
  try {
    const invoice = await InvoiceModel.findOne({
      _id: req.params.id,
    });

    const OrderId = invoice.order_id;
    const order = await OrderModel.findOne({
      _id: OrderId,
    });
    const job = await JobModel.findOne({
      _id: order.job_id,
    });
    if (invoice != null) {
      const result = await OrderModel.updateOne(
        {
          _id: OrderId,
        },
        {
          discount: req.body.discount,
          delivery_charges: req.body.delivery_charges,
        }
      );

      const res = await JobModel.updateOne(
        {
          _id: order.job_id,
        },
        {
          discount: req.body.discount,
          delivery_charges: req.body.delivery_charges,
        }
      );

      if (result != null) {
        const result = await InvoiceModel.updateOne(
          {
            _id: req.params.id,
          },
          {
            discount: req.body.discount,
            delivery_charges: req.body.delivery_charges,
            total: order.total - parseInt(req.body.discount) + parseInt(req.body.delivery_charges),
            balance:
            order.total - parseInt(req.body.discount) + parseInt(req.body.delivery_charges),
          }
        );
        if (result != null) {
          return { status: 200, result };
        } else {
          return { status: 400, error: "Error while updating invoice" };
        }
      }
    }
  } catch (err) {
    return err;
  }
}

async function getInvoiceByCustomerId(customerId) {
  try {
    const OrderList = await OrderModel.find({
      "customer.customerId": customerId,
    });

    const invoiceList = [];
    if (OrderList.length == 0) {
      return { status: 200, invoiceList };
    }
    for (let i = 0; i < OrderList.length; i++) {
      const invoice = await InvoiceModel.findOne({
        order_id: OrderList[i]._id,
        isCompleted: false,
      });
      if (invoice != null) {
        invoiceList.push(invoice);
      }
    }
    if (invoiceList.length > 0) {
      return { status: 200, invoiceList };
    } else {
      return { status: 200, invoiceList };
    }
  } catch (err) {
    return err;
  }
}
// async function updateInvoice(invoice) {
//   try {
//     console.log("invoice", invoice.length);
//     for (let i = 0; i < invoice.length; i++) {
//       const exInvoice = await InvoiceModel.findById(invoice[i].inv_id);
//       console.log("ssss", exInvoice);
//       const res = await InvoiceModel.findByIdAndUpdate(invoice[i].inv_id, {
//         paidAmount: exInvoice.paidAmount + invoice[i].paidAmount,
//         balance: exInvoice.balance - invoice[i].paidAmount,
//         isCompleted:
//           exInvoice.total === invoice[i].paidAmount ||
//           exInvoice.balance === invoice[i].paidAmount
//             ? true
//             : false,
//       });
//       if (!res) {
//         return { status: 400, error: "Error while updating invoice" };
//       }
//     }
//     return { status: 200, message: "Invoices updated successfully" };
//   } catch (err) {
//     return err;
//   }
// }

async function updateInvoice(invoice) {
  try {
    console.log("invoice", invoice.length);
    for (let i = 0; i < invoice.length; i++) {
      const exInvoice = await InvoiceModel.findById(invoice[i].inv_id);
      const res = await InvoiceModel.findByIdAndUpdate(invoice[i].inv_id, {
        paidAmount: exInvoice.paidAmount + invoice[i].paidAmount,
        balance: exInvoice.balance - invoice[i].paidAmount,
        isCompleted:
          exInvoice.total === invoice[i].paidAmount ||
          exInvoice.balance === invoice[i].paidAmount
            ? true
            : false,
      });
      if (!res) {
        return { status: 400, error: "Error while updating invoice" };
      }
    }
    return { status: 200, message: "Invoices updated successfully" };
  } catch (err) {
    return { status: 400, error: err.message || err };
  }
}


module.exports = {
  createInvoice,
  getAllInvoices,
  updateDeliveryAndDiscount,
  getInvoiceByCustomerId,
  updateInvoice,
};
