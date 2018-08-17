const mongoose = require("mongoose")

var PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    tags:{
        type:[String]
    },

    img:{
        type:Buffer
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

//THIS NEEDS CONNECTION WITH USER SCHEMA
module.exports.updatePost = function(id){

}

module.exports.sharePost = function(id, shareduser){
    
}

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