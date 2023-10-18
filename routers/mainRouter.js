const express = require("express");

const mainController = require("../controllers/mainController");
const mainRouter = express.Router(); 

mainRouter.get("/houses", mainController.getHouses);
mainRouter.get("/states", mainController.getStates);

mainRouter.get("/allWorkers", mainController.getAllWorkers);
mainRouter.get("/allForemens", mainController.getAllForemens);

 
module.exports = mainRouter;