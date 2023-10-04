const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
  jobtitle: {
    type: String,
    required: true
  },
  companyname: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  opening: {
    type: Number,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  english_required: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  work_type: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  timing: {
    type: String,
    required: true
  },
  contact_person: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  } 
});

module.exports = mongoose.model("joblistings", jobListingSchema);

