const mongoose = require("mongoose")

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

var Post = mongoose.model("post", PostSchema)

module.exports = {
    Post
}