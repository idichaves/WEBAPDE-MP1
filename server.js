/****IMPORTS***********************/
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const hbs = require("hbs");
const crypto = require("crypto");
const {User} = require("./model/user.js")
const {Post} = require("./model/post.js")
const {Tag} = require("./model/tag.js")
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

    var user = new User({
        username, hashedpassword, desc
    })

    // var existingUser = ops.retrieveUserWithUsername(username)
    // //if no result, meaning username is unique
    // if (!existingUser){
    //     ops.addUser(user)
    //     res.render("login.hbs")
    // }else{
    //     res.redirect("/register")
    // }
    
    res.render("login.hbs")
    //if success, res.render("login.hbs") else res.render("register.hbs")
    
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

app.get("/search", urlencoder, (req, res) => {
    console.log("GET /search")

    var search = req.query.searchString

    res.render("search.hbs")
})

app.get("/", (req, res) => {
    console.log("GET /")
    //var username = req.session.username

    res.render("index.hbs")
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

    res.render("offlineprofile.hbs")
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

