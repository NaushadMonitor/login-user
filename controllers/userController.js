import  ErrorHandler  from "../utils/errorhander.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken.js";

// Login User
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;

  // checking if user has given password and username both
  if (!username || !password) {
    return next(new ErrorHandler("Please Enter username & Password", 400));
  }
  const user = {
    username: "admin",
    password: "admin@123",
  };

  // Check if provided credentials match the user's credentials
  if (!(user.username === username && user.password === password)) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }
  sendToken(user, 201, "Login successfully", res);
});

// Logout User
const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export {loginUser, logout}