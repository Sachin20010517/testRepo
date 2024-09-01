let route = require("../models/route-model");

async function SaveRoute(req) {
  try {
    const result = await route.create(req.body);

    if (result) {
      return { status: 200, message: "Route saved successfully", data: result };
    } else {
      return {
        status: 400,
        message: "Error while saving route",
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
        message: `Error while saving route ${err}`,
        error: err,
      };
    }
  }
}
async function getAllRoutes() {
  try {
    const result = await route.find().sort({ createdAt: -1 });
    if (result) {
      return {
        status: 200,
        message: "Routes fetched successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while fetching route",
        data: null,
        error: result.error,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while fetching route ${err}`,
      error: err,
    };
  }
}

async function updateRoute(req) {
  let routeId = req.params.routeId;
  console.log(routeId);
  const { name, description } = req.body;

  const update = {
    name,
    description,
  };

  try {
    const result = await route.findByIdAndUpdate(routeId, update, {
      new: true,
    });
    if (result) {
      return {
        status: 200,
        message: "Route Updated Successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while updating route",
        error: result.error,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while updating route ${err}`,
      error: err,
    };
  }
}

async function deleteRoute(req) {
  let routeId = req.params.routeId;
  try {
    const result = await route.findByIdAndDelete(routeId);
    if (result) {
      return {
        status: 200,
        message: "Route deleted Successfully",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "Error while deleting route",
        error: result.error,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message: `Error while deleting route ${err}`,
      error: err,
    };
  }
}

module.exports = {
  SaveRoute,
  getAllRoutes,
  updateRoute,
  deleteRoute,
};
