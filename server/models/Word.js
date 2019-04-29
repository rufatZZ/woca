const mongoose = require("mongoose");

let WordSchema = new mongoose.Schema({
  title: String,
  createdAt: Date
});

module.exports = mongoose.model('Word', WordSchema);