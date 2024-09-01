"use strict";
const RouteService = require("../services/route-service");
var response = require("../utils/response-utils");

async function SaveRoute(req, res) {
  try {
    const result = await RouteService.SaveRoute(req);
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Route saved successfully",
        result,
        res
      );
    } else {
      return response.sendBadRequestResponse(
        "Error while saving route",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    return response.sendServerErrorResponse(
      "Error while saving route",
      null,
      err,
      res
    );
  }
}

async function getAllRoutes(req, res) {
  try {
    const result = await RouteService.getAllRoutes();
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Routes fetched successfully",
        result,
        res
      );
    } else {
      return response.sendBadRequestResponse(
        "Error while fetching route",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    return response.sendServerErrorResponse(
      "Error while fetching route",
      null,
      err,
      res
    );
  }
}

async function updateRoute(req, res) {
  try {
    console.log(req.params.routeId);
    const result = await RouteService.updateRoute(req);
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Route Updated Successfully",
        result,
        res
      );
    } else {
      return response.sendBadRequestResponse(
        "Error while updating route",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    console.log(err);
    // return response.sendServerErrorResponse("Error while updating route",null,err,res);
  }
}

async function deleteRoute(req, res) {
  try {
    const result = await RouteService.deleteRoute(req);
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Route deleted Successfully",
        result,
        res
      );
    } else {
      return response.sendBadRequestResponse(
        "Error while deleting route",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    console.log(err);
    // return response.sendServerErrorResponse("Error while deleting route",null,err,res);
  }
}

module.exports = {
  SaveRoute,
  getAllRoutes,
  updateRoute,
  deleteRoute,
};
