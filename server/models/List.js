const mongoose = require("mongoose");

let ListSchema = new mongoose.Schema({
    title: String,
    createdAt: Date
});

module.exports = mongoose.model('List', ListSchema);