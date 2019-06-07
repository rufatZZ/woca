const mongoose = require("mongoose");

let WordSchema = new mongoose.Schema({
  title: String,
  lists: { type: [String], ref: "List" },
  createdAt: Date
});

module.exports = mongoose.model("Word", WordSchema);
