/****IMPORTS***********************/
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const hbs = require("hbs");
const session = require("express-session")

/****SETUP***********************/
const app = express();
const port = 3000;

mongoose.Promise = global.Promise
// @ds233212.mlab.com:33212/memeify
mongoose.connect("mongodb://localhost:27017/memeify", {
    useNewUrlParser: true
});

app.set("view-engine", "hbs")
app.use(express.static(__dirname + "/public"))
app.use(session({
    secret: "supersecret",
    name: "memeify",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7*3
    }
}))
app.use(require("./controllers"))

app.listen(process.env.PORT || port, () => {
    console.log("Listening in port " + port);
});