const express = require("express")
const path = require("path")
const app = express()
const router = express.Router()
const Post = require("../model/post")

router.use("/post", require("./post"))
router.use("/user", require("./user"))
router.use("/tag", require("./tag"))

router.get("/", (req, res) => {
    console.log("GET /")
    // Post.getAllPublicPosts().then((posts) => {
    // res.render("index.hbs")
    // })

   res.render("index.hbs")
})

router.get("/index", (req, res) => {
    console.log("GET /index")

    res.redirect("/")
})

router.get("/loginpage", (req, res) => {
    console.log("GET /loginpage")

    res.render("login.hbs")
});

router.get("/register",(req, res) => {
    console.log("GET /register")
    
    res.render("register.hbs")
});

router.get("/offlineprofile", (req, res) => {
    console.log("GET /offlineprofile")

    res.render("offlineprofile.hbs")
})

router.get("/search", (req, res) => {
    console.log("GET /search")

    var search = req.query.searchString

    res.render("search.hbs")
})

router.use("*", (req, res) => {
    res.status(404).send("There is no such page")
    //add new html file for Error 404 page.
});

module.exports = router