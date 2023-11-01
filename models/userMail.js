const mongoose = require("mongoose");

const userMailSchema = new mongoose.Schema({

name: {
  type: String,
  require: true,
},
county_code: {
  type: Number,
  require: true,
},
phone: {
  type: Number,
  require: true,
},
email: {
  type: String,
  require: true,
},
message: {
  type: String,
  require: false,
},
service_type: {
  type: String,
  require: false,
},
},{ timestamps: true });

module.exports = mongoose.model("userMmail", userMailSchema);
