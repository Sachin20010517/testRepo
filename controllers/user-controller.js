"use strict";
const UserService = require('../services/user-service');
var response = require("../utils/response-utils");


async function Login(req, res) {
    try {
        const result = await UserService.login(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("User Login successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while login userss", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while login users", null, err, res);
    }
}

async function registerUser(req, res) {
    try {
        const { username, email, password, role } = req.body;
        const result = await UserService.registerUser(username, email, password, role);
        if (result.status === 200) {
            return response.sendSuccessResponse("User registered successfully", result, res);
        } else {
            return response.sendBadRequestResponse("Error while registering user", null, result.error, res);
        }
    } catch (err) {
        return response.sendServerErrorResponse("Error while registering user", null, err, res);
    }
}



async function getAllUsers(req, res) {
    try {
        const result = await UserService.getAllUsers();
        return response.sendSuccessResponse("All users retrieved successfully", result, res);
    } catch (err) {
        return response.sendServerErrorResponse("Error getting all users", null, err, res);
    }
}

async function deleteUser(req, res) {
    try {
        
        const result = await UserService.deleteUserById(req.params.userId);

        if(result.status === 200){
            return response.sendSuccessResponse(result.message, null, res);
        } else {
            return response.sendBadRequestResponse(result.message, null, result.error, res);
        }

    } catch (err) {
        return response.sendServerErrorResponse("Error deleting user", null, err, res);
    }
}

async function updateUser(req, res) {
    try {
        const { userId } = req.params;
        const updates = req.body;
        const result = await UserService.updateUserById(userId, updates);
        if (result.status === 200) {
            return response.sendSuccessResponse(result.message, result.user, res);
        } else {
            return response.sendErrorResponse(result.status, result.error, res);
        }
    } catch (err) {
        console.error("Error updating user:", err);
        return response.sendServerErrorResponse("Error updating user", null, err, res);
    }
}



module.exports = {
   Login,
    registerUser,
    getAllUsers,
    deleteUser,
    updateUser,
  
}


