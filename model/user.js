const mongoose = require("mongoose")
const Schema = mongoose.Schema

var UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        minlength: 4
    },

    password:{
        type:String,
        required:true,
        minlength: 8
    },

    desc:{
        type:String,
        required:false,
    },

    posts:{
        type:Array
    }
})

var User = mongoose.model("user", UserSchema)

module.exports.addUser = function(user){
    return new Promise(function (resolve, reject){
        var u = new User(user)
        u.save().then((newUser) => {
            resolve(newUser)
        }, (error) => {
            reject(error)
        })
    })
}

module.exports.getAllUsers = function(){
    return new Promise (function(resolve, reject){
        User.find().then((users) => {
            resolve(users)
        }, (error) => {
            reject(error)
        })
    })
}

module.exports.getUser = function(id){
    return new Promise (function(resolve, reject){
        User.findOne({
            _id: id
        }).then((user) => {
            resolve(user)
        }, (error) => {
            reject(error) 
        })
    })
}

module.exports.getUserWithUsername = function(uname){
    return new Promise (function(resolve, reject){
        User.findOne({
            username: uname
        }).then((user) => {
            resolve(user)
        }, (error) => {
            reject(error)
        })
    })
}

// THIS NEEDS CONNECTION WITH POST SCHEMA
module.exports.updateUserPost = function (){
    return new Promise(function(resolve, reject){

    })
}

// THIS NEEDS CONNECTION WITH POST SCHEMA
module.exports.deleteUserPost = function(userid, posts){
    return new Promise(function(resolve, reject){
        User.findOneAndUpdate({
            _id: userid
        }, {
            posts
        }).then((user) => {
            resolve(user)
        }, (error) => {
            reject(error)
        })
    })
}