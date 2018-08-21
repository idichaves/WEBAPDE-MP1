const express = require("express")
const router = express.Router()
const Post = require("../model/post")

// ADD POST
router.post("/upload", urlencoder, (req, res) => {
    console.log("POST /upload")

    var title = req.body.title


})

// FROM PROFILE
router.post("/share", urlencoder, (req, res) => {

})

router.post("/edit", urlencoder, (req, res) => {
    
})

router.post("/delete", urlencoder, (req, res) => {
    console.log("POST /delete")
    //console.log(req.body.postid)


})

module.exports.router = router