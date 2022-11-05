var Userdb = require("../model/employee");
const UserLogin = require("../model/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");

// Create and save new user
exports.create = (req, res) => {
  // Validate the request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // New user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    jobType: req.body.jobType,
    status: req.body.status,

    sundayClockInTime: req.body.sundayClockInTime,
    mondayClockInTime: req.body.mondayClockInTime,
    tuesdayClockInTime: req.body.tuesdayClockInTime,
    wednesdayClockInTime: req.body.wednesdayClockInTime,
    thursdayClockInTime: req.body.thursdayClockInTime,
    fridayClockInTime: req.body.fridayClockInTime,
    saturdayClockInTime: req.body.saturdayClockInTime,

    sundayClockOutTime: req.body.sundayClockOutTime,
    mondayClockOutTime: req.body.mondayClockOutTime,
    tuesdayClockOutTime: req.body.tuesdayClockOutTime,
    wednesdayClockOutTime: req.body.wednesdayClockOutTime,
    thursdayClockOutTime: req.body.thursdayClockOutTime,
    fridayClockOutTime: req.body.fridayClockOutTime,
    saturdayClockOutTime: req.body.saturdayClockOutTime,

    sundayAvailabilityClockInTime: req.body.sundayAvailabilityClockInTime,
    mondayAvailabilityClockInTime: req.body.mondayAvailabilityClockInTime,
    tuesdayAvailabilityClockInTime: req.body.tuesdayAvailabilityClockInTime,
    wednesdayAvailabilityClockInTime: req.body.wednesdayAvailabilityClockInTime,
    thursdayAvailabilityClockInTime: req.body.thursdayAvailabilityClockInTime,
    fridayAvailabilityClockInTime: req.body.fridayAvailabilityClockInTime,
    saturdayAvailabilityClockInTime: req.body.saturdayAvailabilityClockInTime,

    sundayAvailabilityClockOutTime: req.body.sundayAvailabilityClockOutTime,
    mondayAvailabilityClockOutTime: req.body.mondayAvailabilityClockOutTime,
    tuesdayAvailabilityClockOutTime: req.body.tuesdayAvailabilityClockOutTime,
    wednesdayAvailabilityClockOutTime:
      req.body.wednesdayAvailabilityClockOutTime,
    thursdayAvailabilityClockOutTime: req.body.thursdayAvailabilityClockOutTime,
    fridayAvailabilityClockOutTime: req.body.fridayAvailabilityClockOutTime,
    saturdayAvailabilityClockOutTime: req.body.saturdayAvailabilityClockOutTime,
  });

  // Save the data in the database
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect("/add_user");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating a new user",
      });
    });
};

// Retrieve and return all user OR retreive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Not found user with id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `Error retrieving user with id ${id}` });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error occured while retrieving user info",
        });
      });
  }
};

// Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update user with ${id}. Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating user info" });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot delete the user with id${id}`,
      });
    });
};

exports.login = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    UserLogin.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Not found user with id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `Error retrieving user with id ${id}` });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error occured while retrieving user info",
        });
      });
  }
};
