/****IMPORTS***********************/
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const sesssion = require("express-session");
const cookieparser = require("cookie-parser");
const hbs = require("hbs");
//const {User} = require(".model/");



/****SETUP***********************/
const app = express();

const urlencoder = bodyparser.urlencoded({
    extended: false
});

const port = 3000;

app.set("view-engine", "hbs")

var users = []

app.use(express.static(__dirname + "/public"))
app.use(express.static("root/../views/"))
app.use(express.static("root/../images/"))
app.use(express.static("root/../bootstrap-4.1.1-dist/"))
//for cookie
// app.use(session({
//     secret: ""
// }));

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
    //var username = req.session.username

    res.render("index.hbs")
});

app.get("/index", (req, res) => {
    console.log("GET /index")

    res.redirect("/")
});

app.get("/login", (req, res) => {
    console.log("GET /login")

    res.render("login.hbs")
});

app.get("/register",(req, res) => {
    console.log("GET /register")
    
    res.render("register.hbs")
});

app.get("/profile",(req, res) => {
    console.log("GET /profile")
    
    res.render("profile.hbs")
});

app.get("/usermaincopy", (req, res) => {
    console.log("GET /usermaincopy")
    
    res.render("usermaincopy.hbs")
});

app.get("/logout", (req, res) => {
    console.log("GET /logout")
    
    res.render("logout.hbs")
});

app.use("*", (req, res) => {
    res.status(404).send("There is no such path")
    //add new html file for Error 404 page.
});

app.listen(port, () => {
    console.log("Listening in port " + port);
});