const express = require("express");
const { addCategory, getCategory, updateCategory, deleteCategory, getSingleCategory } = require("../controllers/jobCategories");

const router = express.Router();


router.route("/add-category").post(addCategory);
router.route("/all-category").get(getCategory)
router.route("/update-category/:id").put(updateCategory)
router.route("/delete/:id").delete(deleteCategory)
router.route("/single-category/:id").get(getSingleCategory)

module.exports = router;
