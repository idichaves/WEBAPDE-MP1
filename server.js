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

    // var hashedpassword = crypto.createHash("md5").update(password).digest("hex")

    //add into database
    
    //if success, res.render("login.hbs") else res.render("register.hbs")
    res.sendFile(path.join(__dirname, "login.html"))
});

app.post("/edit", urlencoder, (req, res) => {
    console.log("POST /edit")

    res.render("profile.hbs")
})

app.post("/upload", urlencoder, (req, res) => {
    console.log("POST /upload")

    var title = req.body.title

    res.render("usermaincopy.hbs")
})

app.post("/share", urlencoder, (req, res) => {
    console.log("POST /share")

    res.render("usermaincopy.hbs")
})

app.post("/delete", urlencoder, (req, res) => {
    console.log("POST /delete")

    res.render("profile.hbs")
})

app.post("/profileupload", urlencoder, (req, res) => {
    console.log("POST /profileupload")

    res.render("profile.hbs")
})

app.get("/search", urlencoder, (req, res) => {
    console.log("GET /search")

    var search = req.query.searchString

    res.render("search.hbs")
})

app.get("/", (req, res) => {
    console.log("GET /")
    //var username = req.session.username

    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/index", (req, res) => {
    console.log("GET /index")

    res.redirect("/")
})

app.get("/loginpage", (req, res) => {
    console.log("GET /loginpage")

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

