const express = require("express");
var session = require('express-session');
const multer  = require("multer");
const path = require("path");

const mainRouter = require("./routers/mainRouter.js");
const clientRouter = require("./routers/clientRouter.js");
const constrRouter = require("./routers/constrRouter.js");
const mediaRouter = require("./routers/mediaRouter.js");


global.__approot = __dirname;
 
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if(path.extname(file.originalname) === ".mp4"){
        cb(null, __dirname + "/media/videos/");
      }
      else{
        cb(null, __dirname + "/media/images/");
      }
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
    } 
});

app.use(multer({storage:storage}).single("image"));

  
app.use("", mainRouter);
app.use("/clients", clientRouter);
app.use("/construction", constrRouter);
app.use("/media", mediaRouter);


app.use("/media/", express.static(__dirname + '/media/'));
app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));



app.listen(3000);