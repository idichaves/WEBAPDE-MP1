const mongoose = require("mongoose")
const crypto = require("crypto-js")

var UserSchema = mongoose.Schema({
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

var PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    tags:{
        type:Array
    },

    public:{
        type:Boolean
    },

    sharedwith:{
        type:Array
    },

    postedBy:{
        
    }
})

var TagSchema = mongoose.Schema({
    tagName:{
        type:String,
        required:true
    }
})

var User = mongoose.model("user", UserSchema)
var Post = mongoose.model("post", PostSchema)
var Tag = mongoose.model("tag", TagSchema)

module.exports = {
    User,
    Post,
    Tag
}