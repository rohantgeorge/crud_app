const axios = require("axios");
const UserLogin = require("../model/login");

exports.loginRoutes = (req, res) => {
  res.render("login");
};

exports.homeRoutes = (req, res) => {
  // Make a GET request to the API users
  axios.get("http://localhost:3000/api/users").then(function (response) {
    res.render("admin", {
      allUsers: response.data,
      userType: req.session.userType,
      userId: req.session.userId,
    });
  });
};

exports.addRoutes = (req, res) => {
  res.render("add_user", { userType: req.session.userType });
};

exports.createTicketRoutes = (req, res) => {
  res.render("create_ticket", { userType: req.session.userType });
};

exports.colleaguesRoutes = (req, res) => {
  // Make a GET request to the API users
  axios.get("http://localhost:3000/api/users").then(function (response) {
    console.log(response.data, "res");
    res.render("colleagues", {
      users: response.data,
      userType: req.session.userType,
      userId: req.session.userId,
    });
  });
};

exports.allTicketsRoutes = (req, res) => {
  // Make a GET request to the API tickets
  axios.get("http://localhost:3000/api/tickets").then(function (response) {
    res.render("allTickets", {
      allTickets: response.data,
      userType: req.session.userType,
      userId: req.session.userId,
      userName: req.session.userName,
    });
  });
};

exports.updateRoutes = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", {
      params: { id: req.query.id },
    })
    .then(function (userdata) {
      res.render("update_user", {
        user: userdata.data,
        userType: req.session.userType,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.employeeRoutes = async (req, res) => {
  axios
    .get("http://localhost:3000/api/users", {
      params: { id: req.query.id },
    })
    .then(async function (userdata) {
      res.render("employee", {
        allUsers: userdata.data,
        allUser: [userdata.data],
        userType: req.session.userType,
        userId: req.session.userId,
        userName: req.session.userName,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.ticketRoutes = async (req, res) => {
  axios
    .get("http://localhost:3000/api/tickets", {
      params: { id: req.query.id },
    })
    .then(async function (ticketdata) {
      res.render("ticketInfo", {
        allUsers: ticketdata.data,
        allUser: [ticketdata.data],
        userType: req.session.userType,
        userId: req.session.userId,
        userName: req.session.userName,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
