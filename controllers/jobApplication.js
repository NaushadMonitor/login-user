const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const JobApplication = require("../models/jobApplication");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhander");
const { pagination } = require("../utils/apifeatures");

exports.jobApply = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || !req.files.resume) {
    return next(new ErrorHandler(`please select a file`, 400));
  }
  const resume = req.files.resume;

  const myCloud = await cloudinary.v2.uploader.upload(resume.tempFilePath, {
    resource_type: "auto",
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
  const resultPerPage = parseInt(req.query.perPage) || 10;
  const searchQuery = req.query.query || '';


  const applications = await pagination(JobApplication, page, resultPerPage, searchQuery);

  if (applications.results.length === 0) {
    return next(
      new ErrorHandler(`No applications found `, 200)
    );
  }

  res.status(200).json({
    success: true,
    ...applications,
  });
});
