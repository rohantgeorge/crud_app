const mongoose = require("mongoose");

var daysSchema = new mongoose.Schema({
  Sunday: String,
  Monday: String,
  Tuesday: String,
  Wednesday: String,
  Thursday: String,
  Friday: String,
  Saturday: String,
});

const Days = mongoose.model("days", daysSchema);

module.exports = Days;
