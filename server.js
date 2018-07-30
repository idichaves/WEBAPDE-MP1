const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

var urlencoder = bodyparser.urlencoded({
    extended: false
});

var users = []

app.use("/", (req, res, next) => {
    console.log("USE /")
    next();
});

app.post("/login", urlencoder, (req, res) => {
    console.log("POST /login")
    
    var username = req.body.username;
    var password = req.body.password;
});

app.post("/register", urlencoder, (req, res) => {
    console.log("POST /register")

    var username = req.body.username;
    var password = req.body.password;
    var desc = req.body.desc;
});

app.get("/", (req, res) => {
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

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "style.css"));
});

app.use("*", (req, res) => {
    res.status(404).send("There is no such path")
    //add new html file for Error 404 page.
});

app.listen(port, () => {
    console.log("Listening in port " + port);
});