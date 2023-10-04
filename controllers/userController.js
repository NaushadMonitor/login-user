const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;

  // checking if user has given password and username both
  if (!username || !password) {
    return next(new ErrorHander("Please Enter username & Password", 400));
  }
  const user = {
    username: "admin",
    password: "admin@123",
  };

  // Check if provided credentials match the user's credentials
  if (!(user.username === username && user.password === password)) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }
  sendToken(user, 201, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
