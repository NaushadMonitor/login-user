const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
},
status: {
  type: Boolean,
  default: true,
},
},{ timestamps: true });

module.exports = mongoose.model("slider", sliderSchema);
