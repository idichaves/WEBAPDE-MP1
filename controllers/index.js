const express = require("express")
const path = require("path")
const router = express.Router()

router.use("/user", require("user"))
router.use("/post", require("post"))
router.use("/tag", require("tag"))
router.use("/", (req, res, next) => {
    console.log("USE /")
    next();
})

router.get("/", (req, res) => {
    console.log("GET /")

    res.render("index.hbs")
})

router.get("/index", (req, res) => {
    console.log("GET /index")

    res.redirect("/")
})

router.get("/loginpage", (req, res) => {
    console.log("GET /loginpage")

    res.sendFile(path.join(__dirname, "login.html"))
});

router.get("/register",(req, res) => {
    console.log("GET /register")
    
    res.sendFile(path.join(__dirname, "register.html"))
});

router.get("/profile", (req, res) => {
    console.log("GET /profile")
    
    res.render("profile.hbs")
});

router.get("/offlineprofile", (req, res) => {
    console.log("GET /offlineprofile")

    res.render("offlineprofile.hbs")
})

router.get("/usermaincopy", (req, res) => {
    console.log("GET /usermaincopy")
    
    res.render("usermaincopy.hbs")
});

router.get("/logout", (req, res) => {
    console.log("GET /logout")
    
    res.sendFile(path.join(__dirname, "logout.html"))
});

router.get("/search", urlencoder, (req, res) => {
    console.log("GET /search")

    var search = req.query.searchString

    res.render("search.hbs")
})

router.use("*", (req, res) => {
    res.status(404).send("There is no such page")
    //add new html file for Error 404 page.
});

module.exports.router = router