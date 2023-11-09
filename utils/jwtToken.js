import jwt from "jsonwebtoken";
const sendToken = (user, statusCode, message, res) => {
  
   const token =jwt.sign({username:user.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message:message,
    token,
  });
};

export default sendToken;
