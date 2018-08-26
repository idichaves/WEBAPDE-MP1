const express = require("express")
const router = express.Router()
const User = require("../model/user")
const Post = require("../model/post")
const path = require("path")
const bodyparser = require("body-parser")
const multer = require("multer")
const mime = require("mime-types")
const fs = require("fs")

const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
})

const UPLOAD_PATH = path.resolve(path.dirname("post.js").split(path.sep).pop(), "uploads")
const upload = multer({
    dest: UPLOAD_PATH,
    limits:{
        fileSize: 10000000,
        files:2
    }
})

router.use(urlencoder)

// ADD POST
router.post("/upload", upload.single("postimg"), (req, res) => {
    console.log("POST /upload")

    var title = req.body.title
    if (req.file.mimetype.toLowerCase() === mime.lookup("jpg") || req.file.mimetype.toLowerCase() === mime.lookup("png")
            || req.file.mimetype.toLowerCase() === mime.lookup("tiff")) {

        var post = {
            title,
            filename: req.file.filename,
            origfilename: req.file.originalname,
            public: true, //EDIT THIS LATER
            //tags:
            postedBy: req.body.userid
        }
    
        Post.addPost(post).then((newPost) => {
            User.addPostToUser(req.body.userid, newPost).then((user) => {
                res.render("usermaincopy.hbs")
            }, (error) => {
                console.log(error)

                res.redirect("../user/usermaincopy")
            })
        }, (error) => {
            console.log(error)
            res.send("Error")
        })
    } else {
        res.redirect("../user/usermaincopy")
    }
})

router.post("/profileupload", upload.single("postimg"), (req, res) => {
    console.log("POST /profileupload")

    var title = req.body.title

    if (req.file.mimetype.toLowerCase() === mime.lookup("jpg") || req.file.mimetype.toLowerCase() === mime.lookup("png")
            || req.file.mimetype.toLowerCase() === mime.lookup("tiff")) {

        var post = {
            title,
            filename: req.file.filename,
            origfilename: req.file.originalname,
            //tags:
            postedBy: req.body.userid
        }
    
        Post.addPost(post).then((newPost) => {
            User.addPostToUser(req.body.userid, newPost).then((user) => {
                res.render("profile.hbs")
            }, (error) => {
                console.log(error)

                res.redirect("../user/profile")
            })
        }, (error) => {
            console.log(error)
            res.send("Error")
        })
    } else {
        res.redirect("../user/profile")
    }
})

// FROM PROFILE
router.post("/share", urlencoder, (req, res) => {
    console.log("POST /share")

    //res.render("profile.hbs")
})

router.post("/edit", urlencoder, (req, res) => {
    console.log("POST /edit")
    
    //res.render("profile.hbs")
    Post.updatePost
})

router.post("/delete", urlencoder, (req, res) => {
    console.log("POST /delete")
    //console.log(req.body.postid)

    //get userid and postid

    // Post.deletePost(postid).then((result) => {
    //     User.deleteUserPost(userid, postid).then((result2) => {
    //         res.render("profile.hbs")
    //     }, (error) => {
    //         console.log(error)

    //         res.redirect("../user/profile")
    //     })
    // }, (error) => {
    //     console.log(error)

    //     res.redirect("../user/profile")
    // })

    //res.render("profile.hbs")
})

router.get("/photo/:id", (req, res) => {
    console.log(req.params.id)

    Post.getPost(req.params.id).then((post) => {
        fs.createReadStream(path.resolve(UPLOAD_PATH, post.filename)).pipe(res)
    }, (err) => {
        console.log(err)

        res.sendStatus(404)
    })
})

router.get("/profile", (req, res) => {
    res.redirect("../user/profile")
})

router.get("/usermaincopy", (req, res) => {
    res.redirect("../user/usermaincopy")
})

router.get("/logout", (req, res) => {
    res.redirect("../user/logout")
})

module.exports = router