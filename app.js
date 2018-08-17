/****IMPORTS***********************/
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const hbs = require("hbs");
const crypto = require("crypto");

/****SETUP***********************/
const app = express();
const urlencoder = bodyparser.urlencoded({
    extended: false
});
const port = 3000;

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/memeify", {
    useNewUrlParser: true
});

app.set("view-engine", "hbs")
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/images"))
app.use(require("./controllers"))

app.use("/", (req, res, next) => {
    console.log("USE /")
    next();
});

app.post("/login", urlencoder, (req, res) => {
    console.log("POST /login")
    
    //get info
    var username = req.body.username;
    var password = req.body.password;
    var hashedpassword = crypto.createHash("md5").update(password).digest("hex")

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

    var user = new User({
        username, hashedpassword, desc
    })
    
    res.render("login.hbs")
});

app.post("/edit", urlencoder, (req, res) => {
    console.log("POST /edit")

    res.render("profile.hbs")
})

app.post("/upload", urlencoder, (req, res) => {
    console.log("POST /upload")

    var title = req.body.title

    var post = new Post({
        title
    })

    //addPost(post)

    res.render("usermaincopy.hbs")
})

app.post("/share", urlencoder, (req, res) => {
    console.log("POST /share")

    var username = req.body.username

    res.render("usermaincopy.hbs")
})

app.post("/delete", urlencoder, (req, res) => {
    console.log("POST /delete")

    res.render("profile.hbs")
})

app.post("/profileupload", urlencoder, (req, res) => {
    console.log("POST /profileupload")

    var title = req.body.title

    var post = new Post({
        title
    })
    res.render("profile.hbs")
})

app.use("*", (req, res) => {
    res.status(404).send("There is no such page")
    //add new html file for Error 404 page.
});

app.listen(port, () => {
    console.log("Listening in port " + port);
});