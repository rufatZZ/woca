const mongoose = require("mongoose");

let ListSchema = new mongoose.Schema({
    title: String,
    color: String,
    createdAt: Date
});

module.exports = mongoose.model('List', ListSchema);