const express = require("express");

const mediaController = require("../controllers/mediaController.js");
const mediaRouter = express.Router(); 

mediaRouter.post("/uploadFile", mediaController.uploadFile);


module.exports = mediaRouter;
