const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const JobApplication = require("../models/jobApplication");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhander");
const { pagination } = require('../utils/apifeatures');


exports.jobApply = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.resume, {
    // resource_type: "raw",
    folder: "resume",
  });

  const { name, email, phone, dob, post, company, address, contact_person } =
    req.body;

  const condidate = await JobApplication.create({
    name,
    email,
    phone,
    dob,
    contact_person,
    post,
    company,
    address,
    resume: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "your application apply successfully.",
  });
});



exports.getApplication = catchAsyncErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; 
  const resultPerPage = 2; 

  const applications = await pagination(JobApplication, page, resultPerPage);

  if (applications.results.length === 0) {
    return next(new ErrorHandler(`No applications found for page ${page}`, 404));
  }

  res.status(200).json({
    success: true,
    ...applications,
  });
});
