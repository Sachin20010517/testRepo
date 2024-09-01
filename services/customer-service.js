let customer = require("../models/customer-model");

async function SaveCustomer(req) {
  try {
    const result = await customer.create(req.body);

    if (result) {
      return {
        status: 200,
        message: "Customer saved successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while saving customer",
        data: null,
        error: result.error,
      };
    }
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyValue) {
      return {
        status: 400,
        message: `Duplicate key error ${JSON.stringify(err.keyValue)}`,
        error: err,
      };
    } else {
      return {
        status: 500,
        message: `Error while saving customer ${err}`,
        error: err,
      };
    }
  }
}

async function getAllCustomers() {
  try {
    const result = await customer.find().sort({ createdAt: -1 });
    if (result) {
      return {
        status: 200,
        message: "Customers fetched successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while fetching customer",
        data: null,
        error: result.error,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while fetching customer ${err}`,
      error: err,
    };
  }
}

async function updateCustomer(req) {
  let cusId = req.params.id;
  const {
    name,
    mobileNo,
    email,
    address,
    cPerson,
    cMobileNo,
    remark,
    creditLimit,
    route,
    paymentType,
  } = req.body;

  const update = {
    name,
    mobileNo,
    email,
    address,
    cPerson,
    cMobileNo,
    remark,
    creditLimit,
    route,
    paymentType,
  };
  try {
    const result = await customer.findByIdAndUpdate(cusId, update);
    console.log(result);

    if (result) {
      return {
        status: 200,
        message: "Customer updated successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while fetching customer",
        data: null,
        error: result.error,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while updating customer ${err}`,
      error: err,
    };
  }
}

async function deleteCustomer(req) {
  let userId = req.params.id;
  const result = await customer.findByIdAndDelete(userId);

  try {
    if (result) {
      return {
        status: 200,
        message: "Customer deleted successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while deleting customer",
        data: null,
        error: result.error,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while deleting customer ${err}`,
      error: err,
    };
  }
}

async function updateOrderedAmount(id, job) {
  try {
    // Find the existing customer
    const existingCustomer = await customer.findById(id);

    // Calculate the updated ordered amount
    const updatedOrderedAmount = existingCustomer.orderedAmount + job.total;

    console.log("Updated ordered amount:", updatedOrderedAmount);

    // Prepare the update object
    const update = {
      orderedAmount: updatedOrderedAmount,
    };

    // Update the customer
    const result = await customer.findByIdAndUpdate(id, update);

    if (result) {
      return {
        status: 200,
        message: "Customer updated successfully",
        data: result,
      };
    } else {
      // Log the error message and return an appropriate response
      console.error("Error while updating customer. Result:", result);
      return {
        status: 400,
        message: "Error while updating customer",
        data: null,
      };
    }
  } catch (error) {
    // Log the error and return an appropriate response
    console.error("Error updating ordered amount:", error);
    return {
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
}

module.exports = {
  SaveCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  updateOrderedAmount,
};
