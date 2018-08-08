const mongoose = require("mongoose");
const crypto = require("crypto");
const {User} = require("./user.js")
const {Post} = require("./post.js")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/memeify", {
    useNewUrlParser: true
});

module.exports = {
    addUser: function(user){
        user.save().then((newUser) => {
            // success
            console.log("Successfully added user " + newUser)
        }, (err) => {
            // fail
            console.log("Something went wrong. Please try again.")
        })
    },

    retrieveUsers: function (){
        User.find().then((users) => {
            console.log("Retrieved users: " + users)
        }, (err) => {
            console.log("Something went wrong."  + err)
        })
    },

    retrieveUser: function(id){
        User.findOne({
            _id: id
        }).then((result) => {
            console.log("Retrieved user: " + result.username)
        }, (err) => {
            console.log("Something went wrong." + err)
        })
    },

    updateUserDesc:function (id, newDesc){
        User.findOneAndUpdate({
            _id: id
        }, {
            desc: newDesc
        }).then((result) => {
            console.log("Updated a user" + result.username)
        }, (err) => {
            console.log("Something went wrong." + err)
        })
    },

    addPost: function (post){
        post.save().then((newPost) => {
            console.log("Successfully added post " + newPost)
        }, (err) => {
            console.log("Something went wrong." + err)
        })
    },

    retrievePosts: function (){
        Post.find().then((posts) => {
            console.log("Retrieved posts")
        }, (err) => {
            console.log(err)
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

