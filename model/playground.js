const mongoose = require("mongoose");
const crypto = require("crypto");
const {User} = require("./user.js")
const {Post} = require("./post.js")
const {Tag} = require("./tag.js")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/memeify", {
    useNewUrlParser: true
});

module.exports = {
    addUser: function(user){
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

            return users
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

            return result
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

            return result
        }, (err) => {
            console.log("retrieveUserWithUsername " + err)

            return false
        })
    },

    updateUserPost: function(userid, postid, public, sharedwith){
        this.updatePost(postid, public, sharedwith)
        var posts = this.retrieveUserPosts(userid)
        
        for (let i = 0; i < posts.length; i++){
            if (posts[i]._id === postid){
                posts[i].public = public
                posts[i].sharedwith = sharedwith
                break;
            }
        }

        User.findOne({
            _id: userid
        }, {
           posts 
        }).then((msg)=>{
            console.log(msg)

            return true
        }, (err) => {
            console.log(err)

            return false
        })
    },

    deleteUserPost: function(userid, postid){
        this.deletePost(postid)
        var posts = this.retrieveUserPosts(userid)
        
        for (let i = 0; i < posts.length; i++){
            if (posts[i]._id === postid){
                posts.splice(0, i)
                break;
            }
        }

        User.findOne({
            _id: userid
        }, {
           posts 
        }).then((msg)=>{
            console.log(msg)

            return true
        }, (err) => {
            console.log(err)

            return false
        })
    },

    addPost: function (post){
        post.save().then((newPost) => {
            console.log("Successfully added post " + newPost)

            return newPost
        }, (err) => {
            console.log("addPost " + err)

            return false
        })
    },

    retrievePosts: function (){
        Post.find().then((posts) => {
            console.log("Retrieved posts")

            return posts
        }, (err) => {
            console.log("retrievePosts " + err)

            return false
        })
    },

    retrieveUserPosts: function(userid){
        Post.find({
            postedBy: userid
        }).then((posts) => {
            console.log("Successfully retrieved posts")

            return posts
        }, (err) => {
            console.log("retrieveUserPosts" + err)

            return false
        })
    },

    retrievePost: function(id){
        Post.findOne({
            _id: id
        }).then((post) => {
            console.log("Retrieved post" + post.title)

            return post
        }, (err) => {
            console.log(err)

            return false
        })
    },

    addTag: function(name){
        let tag = {
            tagName: name
        }

        tag.save().then((result) => {
            console.log("Successfully added tag")
        }, (err) =>{
            console.log("addTag " + err)

            return 
        })
    },

    retrieveAllTags: function(){
        Tag.find().then((tags) => {
            console.log("Found tags " + tags)

            return tags
        }, (err) => {
            console.log(err)

            return false
        })
    },

    searchByTag: function(id){
        Tag.findOne({
            _id: id
        }).then((tag) => {
            console.log("Found tag")

            return tag
        }, (err) => {
            console.log("searchByTag" + err)

            return false
        })
    },

    searchByTagString: function(tag){
        var posts = this.retrievePosts()

        if (posts){
            for (let i = 0; i < posts.length; i++){
                var noEqual = true
                var j = 0
                while (j < posts[i].tags.length && noEqual){
                    if (posts[i].tags[j] === tag)
                        noEqual = false
                    j++;
                }
            
                if (noEqual)
                    posts.splice(0, i)
                else
                    posts = []
            }

            return posts
        }
        else{
            return false
        }
    },

    updatePost: function(id, public, sharedwith){
        Post.findOneAndUpdate({
            _id: id
        }, {
            public,
            sharedwith
        }).then((result) => {
            console.log("Post successfully updated")

            return result
        }, (err) => {
            console.log("updatePost" + err)

            return false
        })
    },

    deletePost: function(id){
        Post.remove({
            _id: id
        }).then((result) => {
            console.log("Successfully deleted a post")
            
            return true
        }, (err) => {
            console.log("deletePost" + err)

            return false
        })
    },

    sharePost: function(id, sharedUser){
        Post.findOneAndUpdate({
            _id: id
        }, {
            sharedwith:sharedwith.append(sharedUser)
        }).then((res) => {
            console.log(res)

            return res
        }, (err) => {
            console.log(err)

            return false
        })
    }
};

