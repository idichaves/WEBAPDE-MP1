const mongoose = require("mongoose")
const multer = require("multer")
const Schema = mongoose.Schema

var PostSchema = new Schema({
    title:{
        type:String,
        required:true
    },

    filename:{
        type:String
    },

    origfilename:{
        type:String
    },

    tags:{
        type:[String]
    },

    public:{
        type:Boolean
    },

    sharedwith:{
        type:[String]
    },

    postedBy:{
        type:Object //ObjectId
    },
    
    datePosted:{
        type:Date,
        default: Date.now
    }
}, {
    timestamps:true
})

var Post = mongoose.model("post", PostSchema)

module.exports.addPost = function(post){
    return new Promise(function (resolve, reject){
        var p = new Post(post)
        p.save().then((newPost) => {
            resolve(newPost)
        }, (error) => {
            reject(error)
        })
    })
}

module.exports.getAllPosts = function(){
    return new Promise(function (resolve, reject){
        Post.find().then((posts) => {
            resolve(posts)
        }, (error) => {
            reject(error)
        })
    })
}

module.exports.getPost = function(id){
    return new Promise(function(resolve, reject){
        Post.findOne({
            _id: id
        }).then((post) => {
            resolve(post)
        }, (error) => {
            reject(error)
        })
    })
}

module.exports.getUserPosts = function(userid){
    return new Promise(function(resolve, reject){
        Post.find({
            postedBy: userid
        }).then((posts) => {
            resolve(posts)
        }, (error) => {
            reject(error)
        })
    })
}


module.exports.getPostsWithTag = function(tagName){
    return new Promise(function(resolve, reject){
        
    })
}

//THIS NEEDS CONNECTION WITH USER SCHEMA
//CALL THE CONNECTION WITH USER SCHEMA IN CONTROLLERS
module.exports.updatePost = function(id, title, tags){
    return new Promise(function(resolve, reject){
        //How to implement the update user post?
        Post.findOneAndUpdate({
            _id: id
        }, {
            title,
            tags
        }).then((editedPost) =>{
            resolve(editedPost)
        }, (error) => {
            reject(error)
        })
    })
}

//THIS NEEDS CONNECTION WITH USER SCHEMA
module.exports.sharePost = function(id, newSharedwith){
    return new Promise(function(resolve, reject){
        Post.findOneAndUpdate({
            _id: id
        }, {
            sharedwith: newSharedwith
        }).then((sharedPost) => {
            resolve(sharedPost)
        }, (error) => {
            reject(error)
        })
    })
}

//THIS NEEDS CONNECTION WITH USER SCHEMA
module.exports.deletePost = function(postid){
    return new Promise(function(resolve, reject){
        Post.remove({
            _id: postid
        }).then((msg) => {
            resolve(msg)
        }, (error) => {
            reject(error)
        })
    })
}