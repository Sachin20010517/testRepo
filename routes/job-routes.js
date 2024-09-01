var express = require("express");
var router = express.Router();

var JobController = require("../controllers/job-controller");

router.route("/").post((req, res) => {
  JobController.createJob(req, res);
});

router.route("/").get((req, res) => {
  JobController.getAllJobs(req, res);
});

router.route("/:id").patch((req, res) => {
  JobController.activateJob(req, res);
});

router.route("/:id").delete((req, res) => {
  JobController.deletedJob(req, res);
});

router.route("/:id").put((req, res) => {
  JobController.updateJob(req, res);
});

router.route("/wasted").post((req, res) => {
  JobController.saveWastedJob(req, res);
});

router.route("/wasted").get((req, res) => {
  JobController.getWastedJobs(req, res);
});

router.route("/wasted/:id").delete((req, res) => {
  JobController.deleteWastedJob(req, res);
});
router.route("/approvewasted/:id").patch((req, res) => {
  JobController.approveWastedJob(req, res);
});

module.exports = router;
