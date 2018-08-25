const express = require("express")
const router = express.Router()
const User = require("../model/user")
const Post = require("../model/post")
const bodyparser = require("body-parser")

const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)

// ADD POST
router.post("/upload", urlencoder, (req, res) => {
    console.log("POST /upload")

    var title = req.body.title

    //res.render("usermaincopy.hbs")
})

// FROM PROFILE
router.post("/share", urlencoder, (req, res) => {

    //res.render("profile.hbs")
})

router.post("/edit", urlencoder, (req, res) => {
    
    //res.render("profile.hbs")
})

router.post("/delete", urlencoder, (req, res) => {
    console.log("POST /delete")
    //console.log(req.body.postid)

    //res.render("profile.hbs")
})

router.get("/profile", (req, res) => {

})

router.get("/usermaincopy", (req, res) => {

})

router.get("/logout", (req, res) => {
    
})

module.exports = router