const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const user = require("./routes/userRoute");
const jobApplication =require("./routes/jobApplication")
const jobListing =require("./routes/jobListing");
const jobCategories = require("./routes/jobCategories");
const slider = require("./routes/slider");
const latter = require("./routes/callLatter");


app.use("/api", user);
app.use("/api/joblisting", jobListing);
app.use("/api/jobapplication", jobApplication);
app.use("/api/jobcategory", jobCategories);
app.use("/api/slider", slider);
app.use("/api/latter", latter);


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
