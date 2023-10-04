const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Slider = require("../models/slider");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhander");

exports.uploadImage = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "slider",
  });

  await Slider.create({
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Image uploaded successfully.",
  });
});

exports.updateImage = catchAsyncErrors(async (req, res, next) => {
  const { status } = req.body;

  const newImage = { status };
  const slider = await Slider.findByIdAndUpdate(req.params.id, newImage, {
    new: true,
    runValidators: true,
    imageFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Image status updated successfully.",
  });
});

exports.deleteImage = catchAsyncErrors(async (req, res, next) => {
  const slider = await Slider.findById(req.params.id);
  if (!slider) {
    return next(
      new ErrorHandler(`image does not exist with Id: ${req.params.id}`, 400)
    );
  }
  const public_id = slider.image.public_id;
  const myCloud = await cloudinary.v2.uploader.destroy(public_id);

  if (myCloud.result === "ok") {
    await slider.remove();
  }

  res.status(200).json({
    success: true,
    message: "Image Deleted Successfully",
  });
});

exports.getImages = catchAsyncErrors(async (req, res, next) => {
  const images = await Slider.find();

  if (!images) {
    return next(new ErrorHandler(`Not found image`, 400));
  }

  res.status(200).json({
    success: true,
    images,
  });
});
