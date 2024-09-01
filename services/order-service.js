const OrderModel = require("../models/order-model");
const ItemModel = require("../models/item-model");
const InvoiceService = require("../services/invoice-service");
// const SmsService = require("../services/sms-service");
const customerModel = require("../models/customer-model");
const CustomerService = require("../services/customer-service");
const cron = require("node-cron");

async function createOrder(job) {
  try {
    const OrderLength = await OrderModel.find().countDocuments();
    const order_No = "ORD" + (OrderLength + 1);
    const order = new OrderModel({
      order_No,
      customer: job.customer,
      item: job.item,
      quantity: job.quantity,
      total: job.total,
      discount: job.discount,
      date: job.date,
      name: job.name,
      additional_charges: job.additional_charges,
      price: job.price,
      remark: job.remark,
      order_type: job.order_type,
      isFast: job.isFast,
      isUrgent: job.isUrgent,
      isActive: true,
      created_by: job.created_by,
      delivery_type: job.delivery_type,
      delivery_charges: job.delivery_charges,
      job_id: job._id,
    });
    const result = await OrderModel.create(order);

    if (!result) {
      return { status: 400, error: "Error while saving order" };
    } else {
      // await reduceQuantity(job);
      const invoice = await InvoiceService.createInvoice(result);
      // const sms = await SmsService.sendSms(job);

      const res = await CustomerService.updateOrderedAmount(
        job.customer.customerId,
        job
      );
      if (res.status === 200) {
        return { status: 200, result };
      }

      if (invoice.status === 200) {
        return { status: 200, result };
      } else {
        return { status: 400, error: "Error while saving invoice" };
      }
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}
async function getAllOrders(req, res) {
  try {
    const result = await OrderModel.find().sort({ createdAt: -1 });
    return { status: 200, result };
  } catch (err) {
    return err;
  }
}

async function getDeactivateJobs() {
  try {
    const result = await OrderModel.find({ isActive: false }).sort({
      createdAt: -1,
    });
    if (result) {
      return {
        status: 200,
        message: "Jobs fetched successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while fetching job",
        data: null,
        error: result.error,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while fetching job ${err}`,
      error: err,
    };
  }
}

async function getActiveJobs() {
  try {
    const result = await OrderModel.find({ isActive: true }).sort({
      order_No: 1,
    });
    if (result) {
      return {
        status: 200,
        message: "Jobs fetched successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while fetching job",
        data: null,
        error: result.error,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while fetching job ${err}`,
      error: err,
    };
  }
}

async function reduceQuantity(order) {
  try {
    const Item = await ItemModel.findOne({
      _id: order.item,
    });
    const result = await ItemModel.updateOne(
      {
        _id: order.item,
      },
      { available_quantity: Item.available_quantity - order.quantity }
    );
    if (!result) {
      return { status: 400, error: "Error while reducing quantity" };
    }
    return { status: 200, result };
  } catch (err) {
    return err;
    f;
  }
}
async function startPaymentCheckCronJob() {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const orders = await OrderModel.find();
      for (const order of orders) {
        if (order.total === order.paid_amount && !order.isCompleted) {
          order.isCompleted = true;
          await order.save();
        }
      }
      console.log("Payment check completed.");
    } catch (err) {
      console.error("Error occurred while checking payments:", err);
    }
  });
}

async function activateJob(req) {
  let jobId = req.params.id;
  const { isActive } = req.body;

  const activate = { isActive };

  try {
    const result = await OrderModel.findByIdAndUpdate(jobId, activate);

    if (result) {
      return {
        status: 200,
        message: "Job Activates successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while fetching Job",
        data: null,
        error: result.error,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while updating Job ${err}`,
      error: err,
    };
  }
}

async function deleteOrder(req) {
  let userId = req.params.id;
  const result = await orderModel.findByIdAndDelete(userId);

  try {
    if (result) {
      return {
        status: 200,
        message: "Order deleted successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while deleting order",
        data: null,
        error: result.error,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while deleting order ${err}`,
      error: err,
    };
  }
}

async function deleteOrderByJobId(id) {
  const result = await OrderModel.findByIdAndDelete(id);

  try {
    if (result) {
      return {
        status: 200,
        message: "Order deleted successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while deleting order",
        data: null,
        error: result.error,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while deleting order ${err}`,
      error: err,
    };
  }
}

async function updateOrder(job_id, updates) {
  try {
    const order = new OrderModel({
      order_No,
      customer: updates.customer,
      item: updates.item,
      quantity: updates.quantity,
      total: updates.total,
      discount: updates.discount,
      date: updates.date,
      name: updates.name,
      additional_charges: updates.additional_charges,
      price: updates.price,
      remark: updates.remark,
      order_type: updates.order_type,
      isFast: updates.isFast,
      isUrgent: updates.isUrgent,
      isActive: updates.isActive,
      created_by: updates.created_by,
      delivery_type: updates.delivery_type,
      delivery_charges: updates.delivery_charges,
      job_id: updates._id,
    });

    const result = await OrderModel.findByIdAndUpdate(job_id, order, {
      new: true,
    });

    if (result) {
      return { status: 200, result };
    } else {
      return { status: 500, result };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while updating order ${err}`,
      error: err,
    };
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  startPaymentCheckCronJob,
  activateJob,
  getActiveJobs,
  getDeactivateJobs,
  deleteOrder,
  deleteOrderByJobId,
  updateOrder,
};
