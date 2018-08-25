const mongoose = require("mongoose");
const crypto = require("crypto");
const {User} = require("./user.js")
const {Post} = require("./post.js")
const {Tag} = require("./tag.js")


module.exports = {
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
            sharedwith:sharedwith.push(sharedUser)
        }).then((res) => {
            console.log(res)

            return res
        }, (err) => {
            console.log(err)

            return false
        })
    }
};

