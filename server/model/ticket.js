const mongoose = require("mongoose");

var ticketSchema = new mongoose.Schema(
  {
    ticketerName: String,
    ticketeeName: String,
    ticketeeEmail: String,
    ticketType: String,
    transferDate: String,
    transferClockInTime: String,
    transferClockOutTime: String,
    swapDateFrom: String,
    swapDateTo: String,
    swapClockInTimeFrom: String,
    swapClockOutTimeFrom: String,
    swapClockInTimeTo: String,
    swapClockOutTimeTo: String,
  },

  { timestamps: true }
);

const tickets = mongoose.model("tickets", ticketSchema);

module.exports = tickets;
