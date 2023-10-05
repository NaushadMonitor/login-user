const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Latter = require("../models/callLatter");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhander");

exports.addLatter = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.latter, {
    folder: "latter",
  });

  await Latter.create({
    reference_no:req.body.reference_no,
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
  const latters = await Latter.find();

  if (!latters) {
    return next(new ErrorHandler(`Not found call latter`, 400));
  }

  res.status(200).json({
    success: true,
    latters,
  });
});
