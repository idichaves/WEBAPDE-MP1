/****IMPORTS***********************/
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const hbs = require("hbs");

/****SETUP***********************/
const app = express();
const port = 3000;

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/memeify", {
    useNewUrlParser: true
});

app.set("view-engine", "hbs")
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/images"))
app.use(require("./controllers"))

app.listen(process.env.PORT || port, () => {
    console.log("Listening in port " + port);
});