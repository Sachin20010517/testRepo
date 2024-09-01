"use strict";
const CustomerService = require("../services/customer-service");
var response = require("../utils/response-utils");


async function CreateCustomer(req, res) {
    try {
        const result = await CustomerService.SaveCustomer(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Customer saved successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while saving customer", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while saving customer", null, err, res);
    }
}

async function getAllCustomer(req, res) {
    try {
        const result = await CustomerService.getAllCustomers();
        if (result.status === 200) {
            return response.sendSuccessResponse("Customers fetched successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while fetching customer", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while fetching customer", null, err, res);
    }
}

async function updateCustomer(req,res){
    
    try{
        const result = await CustomerService.updateCustomer(req);
        if(result.status === 200){
            return response.sendSuccessResponse("Customer Updated Successfully",result,res);
        }
        else{
            return response.sendBadRequestResponse("Error while updating customer",null,result.error,res);
        }
    }catch(err){
        console.log(err);
        // return response.sendServerErrorResponse("Error while updating customer",null,err,res);
    }
}

async function deleteCustomer(req,res){
    try{
        const result = await CustomerService.deleteCustomer(req);
        if(result.status === 200){
            return response.sendSuccessResponse("Customer deleted Successfully",result,res);
        }
        else{
            return response.sendBadRequestResponse("Error while deleting customer",null,result.error,res);
        }
    }catch(err){
        return response.sendServerErrorResponse("Error while deleting customer",null,err,res);
    }
}


module.exports = {
    CreateCustomer,
    getAllCustomer,
    updateCustomer,
    deleteCustomer
}


