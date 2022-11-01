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
    gender: req.body.gender,
    clockInTime: req.body.clockInTime,
    clockOutTime: req.body.clockOutTime,
    datepicker: req.body.datepicker,
    status: req.body.status,
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
