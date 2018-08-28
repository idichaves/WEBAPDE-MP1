const express = require("express")
const router = express.Router()
const crypto = require("crypto")
const User = require("../model/user")
const Post = require("../model/post")
const bodyparser = require("body-parser")
const session = require("express-session")
const cookieparser = require("cookie-parser")

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)
router.use(cookieparser())
router.use(session({
    secret: "supersecret",
	name : "memeify",
	resave : true,
	saveUninitialized : true,
	cookie: {
		//expire: Date.now()+1000*10 realtime
		maxAge: 1000*60*60*24*7*3
	}
}))

//localhost:3000/user/login
router.post("/login", urlencoder, (req, res) => {
    console.log("POST /user/login")

    if (req.body.username !== "" && req.body.password !== "") {
        var username = req.body.username
        var password = req.body.password
        var hashedpassword = crypto.createHash("md5").update(password).digest("hex")

        User.getUserWithUsername(username).then((user) => {
            if (user) {
                if (hashedpassword === user.password){
                    req.session.username = username
                    Post.getAllPublicPosts().then((posts) => {
                        res.render("usermaincopy.hbs", {
                            user,
                            posts
                        })
                    }, (error) => {
                        console.log(error)

                        res.render("usermaincopy.hbs")
                    })
                } else {
                    res.redirect("../loginpage")
                }
            } else {
                res.redirect("../register")
            }
        }, (error) => {
            console.log(error)

            res.send("Error! Please try again")
        })
    } else {
        res.redirect("../loginpage")
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
                    msg: "Username is already taken!" //or error msg
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

router.get("/logout", (req, res) => {
    console.log("GET /logout")

    req.session.destroy()
    
    res.render("logout.hbs")
});

router.get("/:username", (req, res) => {
    console.log("GET /" + req.params.username)

    //Get public posts
    var username = req.params.username

    Post.getAllPublicPosts().then((posts) => {
        User.getUserWithUsername(username).then((user) => {
            res.render("usermaincopy.hbs", {
                user,
                posts
            })
        }) 
    }, (error) => {
        console.log(error)

        res.send("Error")
    })
});

// localhost:3000/user/profile/:username
router.get("/profile/:username", (req, res) => {
    console.log("GET /" + req.params.username)
    var username = req.session.username
    var mine = false

    if (username === req.params.username)
        mine = true

    //Get user posts
    Post.getUserPosts(req.params.username).then((posts) => {
        User.getUserWithUsername(req.params.username).then((user) => {
            if (mine){
                Post.getAllPosts().then((allposts) => {
                    for (let i = 0; i < allposts.length; i++){
                        for (let j = 0; j < allposts[i].sharedwith.length; j++)
                            if (allposts[i].sharedwith[j] === username){
                                posts.push(allposts[i])
                            }
                    }
                    res.render("profile.hbs", {
                        username,
                        mine,
                        user,
                        posts,
                    })
                })
            } else{
                res.render("profile.hbs", {
                    username,
                    mine,
                    user,
                    posts,
                }) 
            }
        }, (error) => {
            console.log(error)

            res.send("Error")
        })
        
    }, (error) => {
        console.log(error)

        res.send("Error")
    })
});

// router.get("/:id", (req, res) => {
//     console.log("GET /" + req.params.id)
// 	var id = req.params.id
// 	//Food.get(id).then()
// 	//routes to model
// })

module.exports = router