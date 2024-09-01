// const { startOfDay, endOfDay, startOfMonth, endOfMonth, parseISO } = require('date-fns');
// const Invoice = require("../models/invoice-model");
// const Order = require("../models/order-model");

// function toLocalDate(date) {
//   return new Date(date);
// }

// async function getInvoiceByCuzAndDate(data) {
//   try {
//     const { customerId, dateType, date, startDate, endDate, month } = data;
//     let ordersQuery = { "customer.customerId": customerId };
//     let invoices = [];

//     switch (dateType) {
//       case "daily":
//         const parsedDate = parseISO(date);
//         const startOfDayDate = startOfDay(toLocalDate(parsedDate));
//         console.log(startOfDayDate);
//         const endOfDayDate = endOfDay(toLocalDate(parsedDate));
//         console.log(endOfDayDate);
//         ordersQuery.date = { $gte: startOfDayDate, $lte: endOfDayDate };
//         break;
//       case "monthly":
//         const year = parseInt(month.substring(0, 4));
//         const monthNumber = parseInt(month.substring(5)) - 1; // Months are 0-indexed
//         const startOfMonthDate = startOfMonth(new Date(year, monthNumber, 1));
//         const endOfMonthDate = endOfMonth(new Date(year, monthNumber, 1));
//         ordersQuery.date = { $gte: startOfMonthDate, $lte: endOfMonthDate };
//         break;
//       case "range":
//         const parsedStartDate = parseISO(startDate);
//         const parsedEndDate = parseISO(endDate);
//         const startRangeDate = startOfDay(toLocalDate(parsedStartDate));
//         const endRangeDate = endOfDay(toLocalDate(parsedEndDate));
//         ordersQuery.date = { $gte: startRangeDate, $lte: endRangeDate };
//         break;
//       default:
//         throw new Error("Invalid dateType");
//     }

//     const orders = await Order.find(ordersQuery);

//     for (let i = 0; i < orders.length; i++) {
//       const invoice = await Invoice.find({ order_id: orders[i]._id });
//       invoices = invoices.concat(invoice); // Flatten and concatenate
//     }
//     return { status: 200, invoices };
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// }

// module.exports = {
//   getInvoiceByCuzAndDate,
// };
const { startOfDay, endOfDay, startOfMonth, endOfMonth, parseISO } = require('date-fns');
const Invoice = require("../models/invoice-model");
const Order = require("../models/order-model");

function toLocalDate(date) {
  return new Date(date);
}

async function getInvoiceByCuzAndDate(data) {
  try {
    const { customerId, dateType, date, startDate, endDate, month } = data;
    let ordersQuery = { "customer.customerId": customerId };
    let invoices = [];
    let previousBalance = 0;

    switch (dateType) {
      case "daily":
        if (!date) throw new Error("Date is required for daily report");
        const parsedDate = parseISO(date);
        const startOfDayDate = startOfDay(toLocalDate(parsedDate));
        const endOfDayDate = endOfDay(toLocalDate(parsedDate));
        ordersQuery.date = { $gte: startOfDayDate, $lte: endOfDayDate };

        // Calculate previous balance
        previousBalance = await calculatePreviousBalance(customerId, startOfDayDate);
        break;
      case "monthly":
        console.log(data);
        if (!month) throw new Error("Month is required for monthly report");
        const year = parseInt(month.substring(0, 4));
        const monthNumber = parseInt(month.substring(5)) - 1; // Months are 0-indexed
        const startOfMonthDate = startOfMonth(new Date(year, monthNumber, 1));
        const endOfMonthDate = endOfMonth(new Date(year, monthNumber, 1));
        ordersQuery.date = { $gte: startOfMonthDate, $lte: endOfMonthDate };

        // Calculate previous balance
        previousBalance = await calculatePreviousBalance(customerId, startOfMonthDate);
        break;
      case "range":
        if (!startDate || !endDate) throw new Error("Start date and end date are required for range report");
        const parsedStartDate = parseISO(startDate);
        const parsedEndDate = parseISO(endDate);
        const startRangeDate = startOfDay(toLocalDate(parsedStartDate));
        const endRangeDate = endOfDay(toLocalDate(parsedEndDate));
        ordersQuery.date = { $gte: startRangeDate, $lte: endRangeDate };

        // Calculate previous balance
        previousBalance = await calculatePreviousBalance(customerId, startRangeDate);
        break;
      default:
        throw new Error("Invalid dateType");
    }

    const orders = await Order.find(ordersQuery);

    for (let i = 0; i < orders.length; i++) {
      const invoice = await Invoice.find({ order_id: orders[i]._id });
      invoices = invoices.concat(invoice); // Flatten and concatenate
    }

    return { status: 200, invoices, previousBalance };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function calculatePreviousBalance(customerId, date) {
  try {
    const previousOrdersQuery = { "customer.customerId": customerId, date: { $lt: date } };
    const previousOrders = await Order.find(previousOrdersQuery);
    let previousInvoices = [];
    let previousBalance = 0;

    for (let i = 0; i < previousOrders.length; i++) {
      const invoice = await Invoice.find({ order_id: previousOrders[i]._id, isCompleted: false });
      previousInvoices = previousInvoices.concat(invoice);
    }

    previousInvoices.forEach((invoice) => {
      previousBalance += invoice.balance || 0;
    });

    return previousBalance;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = {
  getInvoiceByCuzAndDate,
};
