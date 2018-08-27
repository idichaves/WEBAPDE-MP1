const express = require("express")
const path = require("path")
const app = express()
const router = express.Router()
const cookieparser = require("cookie-parser")
const User = require("../model/user")
const session = require("express-session")
const Post = require("../model/post")

router.use("/post", require("./post"))
router.use("/user", require("./user"))
router.use("/tag", require("./tag"))

router.get("/", (req, res) => {
    console.log("GET /")

    Post.getAllPublicPosts().then((posts) => {
        res.render("index.hbs", {
            posts
        })
    })

    // res.render("index.hbs")
})

router.get("/index", (req, res) => {
    console.log("GET /index")

    res.redirect("/")
})

router.get("/loginpage", (req, res) => {
    console.log("GET /loginpage")

    res.render("login.hbs")
})

router.get("/register",(req, res) => {
    console.log("GET /register")
    
    res.render("register.hbs")
})

router.get("/offlineprofile", (req, res) => {
    console.log("GET /offlineprofile")

    res.render("offlineprofile.hbs")
})

router.get("/search", (req, res) => {
    console.log("GET /search")

    var search = req.query.searchString

    res.render("search.hbs")
})

router.get("/offline/:username", (req, res) => {
    console.log("GET /offline/" + req.params.username)

    var username = req.params.username
    Post.getAllPublicPostsOfUser(username).then((posts) => {
        User.getUserWithUsername(username).then((user) => {
            res.render("offlineprofile.hbs", {
                user,
                posts
            })
        })
    }, (error) => {
        console.log(error)

        res.redirect("/")
    })
})

router.use("*", (req, res) => {
    res.status(404).send("There is no such page")
    //add new html file for Error 404 page.
});

module.exports = router