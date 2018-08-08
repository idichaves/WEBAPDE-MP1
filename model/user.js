const mongoose = require("mongoose")
const crypto = require("crypto-js")
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

// var PostSchema = new Schema({
//     title:{
//         type:String,
//         required:true
//     },

//     public:{
//         type:Boolean
//     },

//     tags:{
//         type:Array
//     },

//     sharedwith:{
//         type:Array
//     },

//     postedBy:{
//         type:Object
//     }
// })

var User = mongoose.model("user", UserSchema)
// var Post = mongoose.model("post", PostSchema)

module.exports = {
    User
    // Post
}