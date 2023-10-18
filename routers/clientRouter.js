const express = require("express");

const clientController = require("../controllers/clientController.js");
const clientRouter = express.Router(); 

clientRouter.get("/houses", clientController.getHouseClients);
clientRouter.get("/foremens", clientController.getForemenClients);
clientRouter.get("/all", clientController.getAllClients);

module.exports = clientRouter;