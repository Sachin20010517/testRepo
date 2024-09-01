const express = require('express')
const router = express.Router()
const controller = require('../controllers/user-controller')

router.route("/login").post((req, res) => {
    controller.Login(req, res);
})
router.route("/registerUser").post((req, res) => {
    controller.registerUser(req, res);
})
router.route("/").get((req, res) => {
    controller.getAllUsers(req, res);
});

router.route("/:userId").delete((req, res) => {
    controller.deleteUser(req, res);
});

router.route("/:userId").put((req, res) => { 
    controller.updateUser(req, res);
});


module.exports = router; 