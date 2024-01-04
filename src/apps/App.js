const express = require("express");
const session = require("express-session")
const config = require("config")
const app = express();

// Session
app.set('trust proxy',1) // trust first proxy
app.use(session({
  secret: config.get("app.session_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
//config view
app.set("views", config.get("app.view_folder"));
app.set("view engine",config.get("app.view_engine"));

app.use(express.urlencoded({extended:true}));
app.use("/static",express.static(config.get("app.static_folder")));

// Create Cart
app.use(require("./middlewares/cart"));
app.use(require("./middlewares/share"));
//Router
app.use(require(config.get("app.router")));
module.exports= app

