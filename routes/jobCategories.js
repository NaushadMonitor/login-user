const express = require("express");
const { addCategory, getCategory, updateCategory, deleteCategory } = require("../controllers/jobCategories");

const router = express.Router();


router.route("/add-category").post(addCategory);
router.route("/all-category").get(getCategory)
router.route("/update-category/:id").put(updateCategory)
router.route("/delete/:id").delete(deleteCategory)

module.exports = router;
