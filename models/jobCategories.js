const mongoose = require("mongoose");

const jobCategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
},{ timestamps: true });

module.exports = mongoose.model("jobCategory", jobCategorySchema);
