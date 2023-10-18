const express = require("express");

const constrController = require("../controllers/constrController.js");
const constrRouter = express.Router();

constrRouter.get("", constrController.getConstruction);
constrRouter.get("/photos", constrController.getConstructionPhotos);
constrRouter.get("/videos", constrController.getConstructionVideos);

module.exports = constrRouter;