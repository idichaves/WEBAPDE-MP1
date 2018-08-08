/****IMPORTS***********************/
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const hbs = require("hbs");
const crypto = require("crypto");
const {ops} = require("./model/playground.js")
//const {User} = require(".model/");

/****SETUP***********************/
const app = express();

const urlencoder = bodyparser.urlencoded({
    extended: false
});

const port = 3000;

// mongoose.Promise = global.Promise
// mongoose.connect("mongodb://localhost:27017/memeify", {
//     useNewUrlParser: true
// });

app.set("view-engine", "hbs")

app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/images"))

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

    //use retrieve operation from playground then unhash password

    //cookie

    //search into database
    //if exists, move to home page
    //else show user does not exist
    res.render("usermaincopy.hbs")
});

app.post("/register", urlencoder, (req, res) => {
    console.log("POST /register")

    //get inputs
    var username = req.body.username;
    var password = req.body.password;
    var desc = req.body.desc;

    var hashedpassword = crypto.createHash("md5").update(password).digest("hex")

    //add into database
    
    //if success, res.render("login.hbs") else res.render("register.hbs")
    res.render("login.hbs")
});

app.get("/", (req, res) => {
    console.log("GET /")
    //var username = req.session.username

    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/index", (req, res) => {
    console.log("GET /index")

    res.redirect("/")
})

app.get("/login", (req, res) => {
    console.log("GET /login")

    res.sendFile(path.join(__dirname, "login.html"))
});

app.get("/register",(req, res) => {
    console.log("GET /register")
    
    res.sendFile(path.join(__dirname, "register.html"))
});

app.get("/profile", (req, res) => {
    console.log("GET /profile")
    
    res.render("profile.hbs")
});

app.get("/offlineprofile", (req, res) => {
    console.log("GET /offlineprofile")

    res.sendFile(path.join(__dirname, "offlineprofile.html"))
})

app.get("/usermaincopy", (req, res) => {
    console.log("GET /usermaincopy")
    
    res.render("usermaincopy.hbs")
});

app.get("/logout", (req, res) => {
    console.log("GET /logout")
    
    res.sendFile(path.join(__dirname, "logout.html"))
});

app.use("*", (req, res) => {
    res.status(404).send("There is no such page")
    //add new html file for Error 404 page.
});

app.listen(port, () => {
    console.log("Listening in port " + port);
});
