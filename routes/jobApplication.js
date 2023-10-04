const express = require("express");

const {jobApply, getApplication}=require("../controllers/jobApplication")
const router = express.Router();

router.route("/job-apply").post(jobApply);
router.route("/received-application").get(getApplication);

module.exports = router;
