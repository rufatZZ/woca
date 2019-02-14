const mongoose = require("mongoose");

let WordSchema = new mongoose.Schema({
  title: String
});

// WordSchema.methods.add = function(){}


module.exports = mongoose.model('Word', WordSchema);
