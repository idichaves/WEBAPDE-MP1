const express = require("express")
const router = express.Router()
const crypto = require("crypto")
const User = require("../model/user")

//localhost:3000/user/login
router.post("/login", urlencoder, (req, res) => {
    console.log("POST /user/login")
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
            res.send("User does not exist.")
        }
    }, (error) => {
        res.send(error)
    })
})

//localhost:3000/user/register
router.post("/register", urlencoder, (req, res) => {
    console.log("POST /user/register")
    var pass = req.body.password
    var hashedpass = crypto.createHash("md5").update(pass).digest("hex")

	var user = {
        username: req.body.name,
        password: hashedpass,
		desc: req.body.desc
    }

    User.getUserWithUsername(user.username).then((user) => {
        if (user) {
            res.render("register.hbs", {
                msg: "Username is already taken!"
            })
        }
        else {
            User.addUser(user).then((newUser) => {
                res.render("login.hbs")
            }, (error) => {
                res.send("Something went wrong, please try again.")
            })
        }
    }, (error) => {
        res.send("Something went wrong, try again.")
    })
})

// router.get("/:fid", (req, res) => {
// 	var id = req.params.fid
// 	//Food.get(id).then()
// 	//routes to model
// })

module.exports.router = router