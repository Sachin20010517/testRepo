const chequeModel = require('../models/cheque-model');
const CustomerModel = require('../models/customer-model');

async function getAllCheques() {
    try {
        const result = await chequeModel.find().sort({ createdAt: -1 });
        if (result) {
            return {
                status: 200,
                message: "Cheques fetched successfully",
                data: result,
            };
        } else {
            return {
                status: 400,
                message: "Error while fetching cheque",
                data: null,
                error: result.error,
            };
        }
    } catch (err) {
        return {
            status: 500,
            message: `Error while fetching cheque ${err}`,
            error: err,
        };
    }
}

async function chequeBanked(req) {
    let chequeId = req.params.id;
    const { status,banked_by } = req.body;
    const update = { status,banked_by };
    const cheque = await chequeModel.findById(chequeId);

    try {
        if(status === "banked"){
           const Customer = await CustomerModel.findById(cheque.customer);
            Customer.paidAmount = Customer.paidAmount + cheque.amount;
            if (Customer.paidAmount >= Customer.orderedAmount) {
                Customer.balance = Customer.paidAmount - Customer.orderedAmount;
            }
            await Customer.save();
        }
        const result = await chequeModel.findByIdAndUpdate(chequeId, update);
    
        if (result) {
          return {
            status: 200,
            message: "cheque status updated successfully",
            data: result,
          };
        } else {
          return {
            status: 400,
            message: "Error while fetching cheque",
            data: null,
            error: result.error,
          };
        }
      } catch (err) {
        return {
          status: 500,
          message: `Error while updating cheque ${err}`,
          error: err,
        };
      }
  }

module.exports = {
    getAllCheques,
    chequeBanked
}
