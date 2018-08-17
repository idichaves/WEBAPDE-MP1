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
        if (user){
            if (hashedpassword === user.password){
                res.render("usermaincopy.hbs")
            } else {
                res.send("Username/password does not match")
            }
        } else{
            res.send("User does not exist")
        }
    }, (error) => {
        res.send(error)
    })
})

//localhost:3000/user/register
router.post("/register", urlencoder, (req, res) => {
    console.log("POST /user/register")
    var pass = req.body.password
    var hashedpass =  crypto.createHash("md5").update(pass).digest("hex")

	var user = {
        username: req.body.name,
        password: hashedpass,
		desc: req.body.desc
    }

    // TODO: ask if this is correct.
    User.getUserWithUsername(user.username).then((user) => {
        //check if there is a username like this, if none, call addUser
        if (user){
            res.send("Username already exists!")
        }
        else{
            User.addUser(user).then((newUser) => {
                res.render("login.hbs")
            }, (error) => {
                res.send(error)
            })
        }
        res.render("login.hbs")
    }, (error) => {
        res.send(error)
    })

    
	// Food.create(f).then(()=>{
	// 	res.render("index")
	// }, ()=>{
	// 	res.render("error")
	// })
})

// router.get("/:fid", (req, res) => {
// 	var id = req.params.fid
// 	//Food.get(id).then()
// 	//routes to model
// })

module.exports.router = router