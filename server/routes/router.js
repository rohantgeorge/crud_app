const express = require("express");
const route = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");
const isAuth = require("../../middleware/auth");

/**
 * @description Root Route
 * @method GET /
 */
route.get("/", services.loginRoutes);

/**
 * @description Admin Dashboard Route
 * @method GET /
 */
route.get("/admin", isAuth, services.homeRoutes);

/**
 * @description All Tickets Dashboard Route
 * @method GET /
 */
route.get("/allTickets", isAuth, services.allTicketsRoutes);

/**
 * @description Single Emoloyee Route
 * @method GET /
 */
route.get("/employee", isAuth, services.employeeRoutes);

/**
 * @description Single Ticket Route
 * @method GET /
 */
route.get("/ticketInfo", isAuth, services.ticketRoutes);

/**
 * @description Colleague List Route
 * @method GET /
 */
route.get("/colleagues", isAuth, services.colleaguesRoutes);

/**
 * @description Add User Route
 * @method GET /add_user
 */
route.get("/add_user", isAuth, services.addRoutes);

/**
 * @description Create Ticket Route
 * @method GET /create_ticket
 */
route.get("/create_ticket", isAuth, services.createTicketRoutes);

/**
 * @description Update User Route
 * @method GET /update_user
 */
route.get("/update_user", isAuth, services.updateRoutes);

// API
route.post("/api/users", controller.create);
route.post("/api/tickets", controller.createTicket);
route.post("/admin", controller.login);
route.get("/api/users", controller.find);
route.get("/api/tickets", controller.findTicket);
route.put("/api/users/:id", controller.update);
route.delete("/api/tickets/:id", controller.deleteTicket);

module.exports = route;
