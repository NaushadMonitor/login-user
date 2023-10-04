const express = require("express");
const {
  loginUser,
  logout
} = require("../controllers/userController");
const {jobApply}=require("../controllers/jobApplication")
const router = express.Router();

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/job-apply").post(jobApply);

module.exports = router;
