const mongoose = require("mongoose");

const latterSchema = new mongoose.Schema({
  reference_no: {
    type: String,
    default: true,
  },
  latter: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{ timestamps: true });

module.exports = mongoose.model("Latter", latterSchema);
