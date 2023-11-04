const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const JobListing = require("../models/jobListing");
const { filterPagination } = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhander");

exports.addJob = catchAsyncErrors(async (req, res, next) => {
  const {
    jobtitle,
    companyname,
    salary,
    opening,
    qualification,
    experience,
    english_required,
    gender,
    description,
    work_type,
    owner_address,
    contact_person,
    timing,
    status,
  } = req.body;

  const jobpost = await JobListing.create({
    jobtitle,
    companyname,
    salary,
    opening,
    qualification,
    experience,
    english_required,
    gender,
    description,
    work_type,
    owner_address,
    contact_person,
    timing,
    status,
  });

  res.status(201).json({
    success: true,
    message: "Job post created  successfully.",
  });
});

exports.getActiveJob = catchAsyncErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const resultPerPage = parseInt(req.query.perPage) || 10;
  const searchQuery = req.query.query;
  const query = {
    $or: [
      { jobtitle: { $regex: searchQuery, $options: "i" } },
      { companyname: { $regex: searchQuery, $options: "i" } },
      { contact_person: { $regex: searchQuery, $options: "i" } },
    ],
  };
query.status=true

  const activeJob = await filterPagination(JobListing, page, resultPerPage, query);

  if (activeJob.results.length === 0) {
    return next(
      new ErrorHandler(`No applications found for page ${page}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    ...activeJob,
  });
});

exports.getInActiveJob = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = parseInt(req.query.perPage) || 10;
  const page = parseInt(req.query.page) || 1;
  const searchQuery = req.query.query;
    const query = {
      $or: [
        { jobtitle: { $regex: searchQuery, $options: "i" } },
        { companyname: { $regex: searchQuery, $options: "i" } },
        { contact_person: { $regex: searchQuery, $options: "i" } },
      ],
    };
  query.status=false
  const inActiveJob = await filterPagination(JobListing, page, resultPerPage,query);

  if (inActiveJob.results.length === 0) {
    return next(
      new ErrorHandler(`No applications found for page ${page}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    ...inActiveJob,
  });
});

exports.updateJobListing = catchAsyncErrors(async (req, res, next) => {
  const {
    jobtitle,
    companyname,
    salary,
    opening,
    qualification,
    experience,
    english_required,
    gender,
    description,
    work_type,
    owner_address,
    contact_person,
    timing,
    status,
  } = req.body;
  const newJobData = {
    jobtitle,
    companyname,
    salary,
    opening,
    qualification,
    experience,
    english_required,
    gender,
    description,
    work_type,
    owner_address,
    contact_person,
    timing,
    status,
  };

  const job = await JobListing.findByIdAndUpdate(req.params.id, newJobData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Job updated Successfully",
  });
});

exports.deleteJob = catchAsyncErrors(async (req, res, next) => {
  const job = await JobListing.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorHandler(`job does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await job.remove();

  res.status(200).json({
    success: true,
    message: "Job Deleted Successfully",
  });
});

exports.getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const job = await JobListing.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorHandler(`job does not exist with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    job,
  });
});
