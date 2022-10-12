const mongoose = require("mongoose");

const ArticlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },


});

module.exports = mongoose.model("articles", ArticlesSchema);
