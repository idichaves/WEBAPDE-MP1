const mongoose = require("mongoose");
const crypto = require("crypto");
const {User} = require("./user.js")
const {Post} = require("./post.js")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/memeify", {
    useNewUrlParser: true
});

module.exports = {
    addUser: function(username, password, desc){
        var user = new User({
            username, password, desc
        })

        user.save().then((newUser) => {
            console.log("Successfully added user " + newUser)

            return true
        }, (err) => {
            console.log("addUser " + err)

            return false
        })
    },

    retrieveUsers: function (){
        User.find().then((users) => {
            console.log("Retrieved users: " + users)

            return true
        }, (err) => {
            console.log("retrieveUsers "  + err)

            return false
        })
    },

    retrieveUser: function(id){
        User.findOne({
            _id: id
        }).then((result) => {
            console.log("Retrieved user: " + result.username)

            return true
        }, (err) => {
            console.log("retrieveUser " + err)

            return false
        })
    },

    retrieveUserWithUsername: function(username){
        User.findOne({
            username
        }).then((result) => {
            console.log("Retrieved user: " + result.username)

            return true
        }, (err) => {
            console.log("retrieveUserWithUsername " + err)

            return false
        })
    },

    updateUserDesc:function (id, newDesc){
        User.findOneAndUpdate({
            _id: id
        }, {
            desc: newDesc
        }).then((result) => {
            console.log("Updated a user")

            return true
        }, (err) => {
            console.log("updateUserDesc " + err)

            return false
        })
    },

    updateUserDescWithUsername: function(username, newDesc){
        User.findOneAndUpdate({
            username
        }, {
            desc: newDesc
        }).then((result) => {
            console.log("Updated a user")

            return true
        }, (err) => {
            console.log("updateUserDescWithUsername " + err)

            return false;
        })
    },

    addPost: function (title, tags, public, sharedwith, postedBy){
        var post = new Post({
            title, tags, public, sharedwith, postedBy
        })

        post.save().then((newPost) => {
            console.log("Successfully added post " + newPost)
        }, (err) => {
            console.log("addPost " + err)
        })
    },

    retrievePosts: function (){
        Post.find().then((posts) => {
            console.log("Retrieved posts")
        }, (err) => {
            console.log("retrievePosts " + err)
        })
    },

    retrievePostsWithUserID: function(id){
        Post.find({
            postedBy: id
        }).then((posts) => {
            console.log("Successfully retrieved posts")
        }, (err) => {
            console.log("retrievePostsWithUserID" + err)
        })
    },

    retrievePost: function(id){
        Post.findOne({
            _id: id
        }).then((post) => {
            console.log("Retrieved post" + post.title)
        }, (err) => {
            console.log(err)
        })
    },

    updatePost: function(id, tags){
        Post.findOneAndUpdate({
            _id: id
        }, {
            tags
        }).then((result) => {
            console.log("Post successfully updated")
        }, (err) => {
            console.log(err)
        })
    },

    deletePost: function(id){
        Post.remove({
            _id: id
        }).then((result) => {
            console.log("Successfully deleted a post")
        }, (err) => {
            console.log(err)
        })
    }
};

