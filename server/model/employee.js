const mongoose = require("mongoose");

var schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    jobType: String,
    avatar: String,
    phone: String,
    status: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userLogin",
      // require: true,
    },

    sundayClockInTime: String,
    mondayClockInTime: String,
    tuesdayClockInTime: String,
    wednesdayClockInTime: String,
    thursdayClockInTime: String,
    fridayClockInTime: String,
    saturdayClockInTime: String,

    sundayClockOutTime: String,
    mondayClockOutTime: String,
    tuesdayClockOutTime: String,
    wednesdayClockOutTime: String,
    thursdayClockOutTime: String,
    fridayClockOutTime: String,
    saturdayClockOutTime: String,

    sundayAvailabilityClockInTime: String,
    mondayAvailabilityClockInTime: String,
    tuesdayAvailabilityClockInTime: String,
    wednesdayAvailabilityClockInTime: String,
    thursdayAvailabilityClockInTime: String,
    fridayAvailabilityClockInTime: String,
    saturdayAvailabilityClockInTime: String,

    sundayAvailabilityClockOutTime: String,
    mondayAvailabilityClockOutTime: String,
    tuesdayAvailabilityClockOutTime: String,
    wednesdayAvailabilityClockOutTime: String,
    thursdayAvailabilityClockOutTime: String,
    fridayAvailabilityClockOutTime: String,
    saturdayAvailabilityClockOutTime: String,
  },

  { timestamps: true }
);

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;
