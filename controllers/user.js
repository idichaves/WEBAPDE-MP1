const express = require("express")
const router = express.Router()
const crypto = require("crypto")
const User = require("../model/user")
const Post = require("../model/post")
const bodyparser = require("body-parser")

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)

//localhost:3000/user/login
router.post("/login", urlencoder, (req, res) => {
    console.log("POST /user/login")
    if (req.body.username !== "" && req.body.password !== ""){
        var username = req.body.username
        var password = req.body.password
        var hashedpassword = crypto.createHash("md5").update(password).digest("hex")

        User.getUserWithUsername(username).then((user) => {
            if (user) {
                if (hashedpassword === user.password){
                    res.render("usermaincopy.hbs")
                } else {
                    res.render("login.hbs", {
                        msg: "Username/password incorrect!"
                    })
                }
            } else {
                res.redirect("../register")
            }
        }, (error) => {
            res.send("Error! Please try again")
        })
    } else {
        res.redirect("../loginpage")
        // res.render("login.hbs", {
        //     msg: "Please enter credentials on the field(s)!"
        // })
    }
})

//localhost:3000/user/register
router.post("/register", urlencoder, (req, res) => {
    console.log("POST /user/register")
    if (req.body.username !== "" && req.body.password !== "") {
        var pass = req.body.password
        var hashedpass = crypto.createHash("md5").update(pass).digest("hex")

	    var user = {
            username: req.body.username,
            password: hashedpass,
		    desc: req.body.desc
        }

        User.getUserWithUsername(user.username).then((gotuser) => {
            if (gotuser) {
                res.render("register.hbs", {
                    msg: "Username is already taken!"
                })
            }
            else {
                User.addUser(user).then((newUser) => {
                    res.render("login.hbs")
                }, (error) => {
                    console.log(error)
                    res.send("Something went wrong, please try again.")
                })
            }
        }, (error) => {
            console.log(error)
            res.send("Something went wrong, try again.")
        })
    } else {
        res.redirect("../register")
    }    
})

router.get("/profile", (req, res) => {
    console.log("GET /profile")

    //Get user posts
    
    res.render("profile.hbs")
});

router.get("/usermaincopy", (req, res) => {
    console.log("GET /usermaincopy")

    //Get public posts
    
    res.render("usermaincopy.hbs")
});

router.get("/logout", (req, res) => {
    console.log("GET /logout")
    
    res.render("logout.hbs")
});

// router.get("/:id", (req, res) => {
//     console.log("GET /" + req.params.id)
// 	var id = req.params.id
// 	//Food.get(id).then()
// 	//routes to model
// })

module.exports = router