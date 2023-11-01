const mongoose = require("mongoose");
const validator = require("validator");

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  phone: {
    type: Number,
    required: true,
  },
  contact_person: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
},{ timestamps: true });

module.exports = mongoose.model("jobapplication", jobApplicationSchema);
