var express = require('express');
var router = express.Router();

const CategoryController = require('../controllers/category-controller');


router.route("/").post((req, res) => {
    CategoryController.CreateCategory(req, res);
})
router.route("/").get((req, res) => {
    CategoryController.getAllCategories(req, res);
}
)
router.route("/:id").put((req, res) => {
    CategoryController.updateCategory(req, res);
})
router.route("/:id").delete((req, res) => {
    CategoryController.deleteCategory(req, res);
})

module.exports = router;   
