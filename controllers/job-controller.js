"use strict";
var JobService = require("../services/job-service");
var response = require("../utils/response-utils");

async function createJob(req, res) {
  try {
    const result = await JobService.createJob(req);
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Job saved successfully",
        result,
        res
      );
    } else {
      if (result.error.code == 11000) {
        return response.sendBadRequestResponse(
          "Job already exist",
          null,
          result.error,
          res
        );
      }
      return response.sendBadRequestResponse(
        "Error while saving job",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    return response.sendServerErrorResponse(
      "Error while saving job",
      null,
      err,
      res
    );
  }
}

async function activateJob(req, res) {
  try {
    const result = await JobService.activateJob(req);
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Job activated successfully",
        result,
        res
      );
    } else {
      return response.sendBadRequestResponse(
        "Error while activatingssdewe job",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    return response.sendServerErrorResponse(
      "Error while activating job",
      null,
      err,
      res
    );
  }
}

async function getAllJobs(req, res) {
  try {
    const result = await JobService.getJobs();
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Jobs fetched successfully",
        result,
        res
      );
    } else {
      return response.sendBadRequestResponse(
        "Error while fetching jobs",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    return response.sendServerErrorResponse(
      "Error while fetching jobs",
      null,
      err,
      res
    );
  }
}
async function deletedJob(req, res) {
  try {
    const result = await JobService.deleteJob(req);
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Job deleted successfully",
        result,
        res
      );
    } else {
      return response.sendBadRequestResponse(
        "Error while deleting job",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    return response.sendServerErrorResponse(
      "Error while deleting job",
      null,
      err,
      res
    );
  }
}

async function updateJob(req, res) {
  try {
    const result = await JobService.updateJob(req, res);
    if (result.status === 200) {
      return response.sendSuccessResponse(result.message, result.job, res);
    } else {
      return response.sendErrorResponse(result.status, result.error, res);
    }
  } catch (err) {
    console.error("Error updating job:", err);
    return response.sendServerErrorResponse(
      "Error updating job",
      null,
      err,
      res
    );
  }
}

async function getWastedJobs (req, res) {
  try {
    const result = await JobService.getWastedJobs();
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Wasted Jobs fetched successfully",
        result,
        res
      );
    } else {
      return response.sendBadRequestResponse(
        "Error while fetching wasted jobs",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    return response.sendServerErrorResponse(
      "Error while fetching wasted jobs",
      null,
      err,
      res
    );
  }
}

async function saveWastedJob(req, res) {
  try {
    const result = await JobService.saveWastedJob(req);
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Wasted Job saved successfully",
        result,
        res
      );
    } else {
      return response.sendBadRequestResponse(
        "Error while saving wasted job",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    return response.sendServerErrorResponse(
      "Error while saving wasted job",
      null,
      err,
      res
    );
  }
}

async function deleteWastedJob(req, res) {
  try {
    const result = await JobService.deleteWastedJob(req);
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Wasted Job deleted successfully",
        result,
        res
      );
    } else {
      return response.sendBadRequestResponse(
        "Error while deleting wasted job",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    return response.sendServerErrorResponse(
      "Error while deleting wasted job",
      null,
      err,
      res
    );
  }
}

async function approveWastedJob(req, res) {
 
  try {
    const result = await JobService.approveWastedJob(req);
    if (result.status === 200) {
      return response.sendSuccessResponse(
        "Wasted Job approved successfully",
        result,
        res
      );
    } else {
      return response.sendBadRequestResponse(
        "Error while approving wasted job",
        null,
        result.error,
        res
      );
    }
  } catch (err) {
    return response.sendServerErrorResponse(
      "Error while approving wasted  job",
      null,
      err,
      res
    );
  }
}

module.exports = {
  createJob,
  activateJob,
  getAllJobs,
  deletedJob,
  updateJob,
  getWastedJobs,
  saveWastedJob,
  deleteWastedJob,
  approveWastedJob,

};
