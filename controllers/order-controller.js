"use strict";
var OrderService = require("../services/order-service");
var response = require("../utils/response-utils");

async function createOrder(req, res) {
    try {
        const result = await OrderService.createOrder(req);
        if (result.status === 200) {
            
            return response.sendSuccessResponse("Order saved successfully", result, res);
        }
        else {
            if (result.error.code == 11000) {
                return response.sendBadRequestResponse("Order already exist", null, result.error, res)
            }
            return response.sendBadRequestResponse("Error while saving order", null, result.error, res);
        }
    }
    catch (err) {
        console.log(err)    
        return response.sendServerErrorResponse("Error while catch saving order", null, err, res);
    }
}

async function getAllOrders (req, res) {
    try {
        const result = await OrderService.getAllOrders(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Orders retrieved successfully", result, res);
        }

        else {
            return response.sendBadRequestResponse("Error while retrieving orders", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while retrieving orders", null, err, res);
    }
}

async function getActivateJobs(req, res) {
    try {
        const result = await OrderService.getActiveJobs();
        if (result.status === 200) {
            return response.sendSuccessResponse("Jobs fetched successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while fetching jobs", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while fetching jobs", null, err, res);
    }
}

async function getDeactivateJobs(req, res) {
    try {
        const result = await OrderService.getDeactivateJobs();
        if (result.status === 200) {
            return response.sendSuccessResponse("Jobs fetched successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while fetching jobs", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while fetching jobs", null, err, res);
    }
}

async function activateJob(req,res){
    
    try{
        const result = await OrderService.activateJob(req);
        if(result.status === 200){
            return response.sendSuccessResponse("Job Activated Successfully",result,res);
        }
        else{
            return response.sendBadRequestResponse("Error while activating job",null,result.error,res);
        }
    }catch(err){
        console.log(err);
        // return response.sendServerErrorResponse("Error while updating customer",null,err,res);
    }
}

async function deleteOrder(req,res){
    try{
        const result = await OrderService.deleteOrder(req);
        if(result.status === 200){
            return response.sendSuccessResponse("Order deleted Successfully",result,res);
        }
        else{
            return response.sendBadRequestResponse("Error while deleting order",null,result.error,res);
        }
    }catch(err){
        return response.sendServerErrorResponse("Error while deleting order",null,err,res);
    }
}

async function updateOrder(req,res){
    
    try{
        const result = await OrderService.updateOrder(req);
        if(result.status === 200){
            return response.sendSuccessResponse("order Updated Successfully",result,res);
        }
        else{
            return response.sendBadRequestResponse("Error while updating order",null,result.error,res);
        }
    }catch(err){
        console.log(err);
        
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    activateJob,
    getActivateJobs,
    getDeactivateJobs,
    deleteOrder,
    updateOrder
}