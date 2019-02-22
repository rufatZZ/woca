const mongoose = require("mongoose");

let WordSchema = new mongoose.Schema({
  title: String,
  createdAt: Date
});

// WordSchema.methods.add = function(){}


module.exports = mongoose.model('Word', WordSchema);
