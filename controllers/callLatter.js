const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Latter = require("../models/callLatter");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhander");
const { pagination } = require("../utils/apifeatures");

exports.addLatter = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || !req.files.latter) {
    return next(new ErrorHandler(`please select a file`, 400));
  }
  const latter = req.files.latter;
  const myCloud = await cloudinary.v2.uploader.upload(latter.tempFilePath, {
    folder: "latter",
    resource_type: "auto",
  });

  await Latter.create({
    reference_no: req.body.reference_no,
    latter: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Call Latter added successfully.",
  });
});

exports.getLatter = catchAsyncErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const resultPerPage = parseInt(req.query.perPage) || 10;
  const searchQuery = req.query.query || '';


  const latter = await pagination(Latter, page, resultPerPage, searchQuery);

  if (latter.results.length === 0) {
    return next(
      new ErrorHandler(`No latter found`, 200)
    );
  }

  res.status(200).json({
    success: true,
    ...latter,
  });
});

exports.deleteLatter = catchAsyncErrors(async (req, res, next) => {
  const latter = await Latter.findById(req.params.id);

  if (!latter) {
    return next(
      new ErrorHandler(
        `Call Latter does not exist with Id: ${req.params.id}`,
        400
      )
    );
  }

  await latter.remove();

  res.status(200).json({
    success: true,
    message: "Call Latter Deleted Successfully",
  });
});
