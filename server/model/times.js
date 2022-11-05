const mongoose = require("mongoose");

var timeSchema = new mongoose.Schema({
  clockInTimes: {
    sundayClockInTime: String,
    mondayClockInTime: String,
    tuesdayClockInTime: String,
    wednesdayClockInTime: String,
    thursdayClockInTime: String,
    fridayClockInTime: String,
    saturdayClockInTime: String,
  },
  clockOutTimes: {
    sundayClockOutTime: String,
    mondayClockOutTime: String,
    tuesdayClockOutTime: String,
    wednesdayClockOutTime: String,
    thursdayClockOutTime: String,
    fridayClockOutTime: String,
    saturdayClockOutTime: String,
  },
});

const Times = mongoose.model("times", timeSchema);

module.exports = Times;
