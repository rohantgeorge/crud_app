const axios = require("axios");

exports.loginRoutes = (req, res) => {
  res.render("login");
};

exports.homeRoutes = (req, res) => {
  // Make a GET request to the API users
  axios.get("http://localhost:3000/api/users").then(function (response) {
    res.render("adminDashboard", { users: response.data });
  });
};

exports.addRoutes = (req, res) => {
  res.render("add_user");
};

exports.updateRoutes = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", {
      params: { id: req.query.id },
    })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
