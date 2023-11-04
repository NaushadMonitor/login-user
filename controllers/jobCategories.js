const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jobCategory = require("../models/jobCategories");
const { pagination } = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhander");

exports.addCategory = catchAsyncErrors(async (req, res, next) => {
  const { category_name, description } = req.body;

  const jobpost = await jobCategory.create({
    category_name,
    description,
  });

  res.status(201).json({
    success: true,
    message: "Category created  successfully.",
  });
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const { category_name, description } = req.body;

  const newCategory = {
    category_name,
    description,
  };

  const category = await jobCategory.findByIdAndUpdate(
    req.params.id,
    newCategory,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Category updated  successfully.",
  });
});

exports.getSingleCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await jobCategory.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorHandler(`categry does not exist with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    category,
  });
});

exports.getCategory = catchAsyncErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const resultPerPage = parseInt(req.query.perPage) || 10;

  const category = await pagination(jobCategory, page, resultPerPage);

  if (category.results.length === 0) {
    return next(new ErrorHandler(`No category found for page ${page}`, 404));
  }

  res.status(200).json({
    success: true,
    ...category,
  });
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await jobCategory.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorHandler(`category does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "Category deleted Successfully",
  });
});
