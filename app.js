/****IMPORTS***********************/
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
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

// app.use("/", (req, res, next) => {
//     console.log("USE /")
//     next();
// });

// app.post("/edit", urlencoder, (req, res) => {
//     console.log("POST /edit")

//     res.render("profile.hbs")
// })

// app.post("/upload", urlencoder, (req, res) => {
//     console.log("POST /upload")

//     var title = req.body.title

//     var post = new Post({
//         title
//     })

//     //addPost(post)

//     res.render("usermaincopy.hbs")
// })

// app.post("/share", urlencoder, (req, res) => {
//     console.log("POST /share")

//     var username = req.body.username

//     res.render("usermaincopy.hbs")
// })

// app.post("/delete", urlencoder, (req, res) => {
//     console.log("POST /delete")

//     res.render("profile.hbs")
// })

// app.post("/profileupload", urlencoder, (req, res) => {
//     console.log("POST /profileupload")

//     var title = req.body.title

//     var post = new Post({
//         title
//     })
//     res.render("profile.hbs")
// })

// app.use("*", (req, res) => {
//     res.status(404).send("There is no such page")
//     //add new html file for Error 404 page.
// });


app.listen(process.env.PORT || port, () => {
    console.log("Listening in port " + port);
});