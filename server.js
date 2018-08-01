const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const sesssion = require("express-session");
const cookieparser = require("cookie-parser");
const hbs = require("hbs");
//const {User} = require(".model/");

const app = express();

const urlencoder = bodyparser.urlencoded({
    extended: false
});

const port = 3000;

app.set("view-engine", "hbs")

var users = []

app.use(express.static("root/../css/"))
app.use(express.static("root/../js/"))
app.use(express.static("root/../views/"))
//for cookie
app.use(session({
    secret: ""
}));

app.use("/", (req, res, next) => {
    console.log("USE /")
    next();
});

app.post("/login", urlencoder, (req, res) => {
    console.log("POST /login")
    
    //get info
    var username = req.body.username;
    var password = req.body.password;

    //cookie

    //search into database
    //if exists, move to home page
    //else show user does not exist
    
});

app.post("/register", urlencoder, (req, res) => {
    console.log("POST /register")

    //get inputs
    var username = req.body.username;
    var password = req.body.password;
    var desc = req.body.desc;

    //add into database
    //if success, else
});

// app.post("/post", urlencoder, (req, res) => {
//
// })

// app.put("/edit", urlencoder, (req, res) => {

// })

// app.delete("/remove", urlencoder, (req, res) => {

// })

app.get("/", (req, res) => {
    console.log("GET /")
    var username = req.session.username

    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req, res) => {
    console.log("GET /")

    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login.html", (req, res) => {
    console.log("GET /login.html")

    res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/register.html", (req, res) => {
    console.log("GET /register.html")
    
    res.sendFile(path.join(__dirname, "register.html"));
});

app.use("*", (req, res) => {
    res.status(404).send("There is no such path")
    //add new html file for Error 404 page.
});

app.listen(port, () => {
    console.log("Listening in port " + port);
});