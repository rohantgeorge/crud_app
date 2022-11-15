const express = require("express");
const route = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");

/**
 * @description Root Route
 * @method GET /
 */
route.get("/", services.loginRoutes);

/**
 * @description Admin Dashboard Route
 * @method GET /
 */
route.get("/admin", services.homeRoutes);

/**
 * @description Single Emoloyee Route
 * @method GET /
 */
route.get("/employee", services.employeeRoutes);

/**
 * @description Colleague List Route
 * @method GET /
 */
route.get("/colleagues", services.colleaguesRoutes);

/**
 * @description Add User Route
 * @method GET /add_user
 */
route.get("/add_user", services.addRoutes);

/**
 * @description Update User Route
 * @method GET /update_user
 */
route.get("/update_user", services.updateRoutes);

// API
route.post("/api/users", controller.create);
route.post("/admin", controller.login);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

module.exports = route;
