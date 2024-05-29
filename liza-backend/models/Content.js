const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String],
});

module.exports = mongoose.model("Content", ContentSchema);
