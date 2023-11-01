const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const userMail = require("../models/userMail");
const { pagination } = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhander");

exports.CreatUserMail = catchAsyncErrors(async (req, res, next) => {
  const { name,county_code, phone, email, message, service_type } = req.body;

  const usermail = await userMail.create({
    name,
    county_code,
    phone,
    email,
    message,
    service_type,
  });

  res.status(201).json({
    success: true,
    message: "Your message submited successfully.",
  });
});

exports.getUserMail = catchAsyncErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const resultPerPage = parseInt(req.query.perPage) || 10;

  const usermail = await pagination(userMail, page, resultPerPage);

  if (usermail.results.length === 0) {
    return next(new ErrorHandler(`No user mail found for page ${page}`, 404));
  }

  res.status(200).json({
    success: true,
    ...usermail,
  });
});

exports.deleteUserMail = catchAsyncErrors(async (req, res, next) => {
  const usermail = await userMail.findById(req.params.id);

  if (!usermail) {
    return next(
      new ErrorHandler(`category does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await usermail.remove();

  res.status(200).json({
    success: true,
    message: "mail is deleted Successfully",
  });
});
