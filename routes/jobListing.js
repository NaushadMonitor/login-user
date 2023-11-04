const express = require("express");

const {addJob, getActiveJob, getInActiveJob, updateJobListing, deleteJob, getSingleJob}=require("../controllers/jobListing")
const router = express.Router();


router.route("/add-job").post(addJob);
router.route("/active-job").get(getActiveJob)
router.route("/inactive-job").get(getInActiveJob)
router.route("/update-job/:id").put(updateJobListing)
router.route("/delete/:id").delete(deleteJob)
router.route("/single-job/:id").get(getSingleJob)

module.exports = router;
