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

module.exports = {
    Post
}