const mongoose = require("mongoose")

var TagSchema = mongoose.Schema({
    tagName:{
        type:String,
        required:true
    },
    postId:{
        type:Array
    }
})

var Tag = mongoose.model("tag", TagSchema)

module.exports.addTag = function(tag){
    return new Promise(function(resolve, reject){
        var t = new Tag(tag)
        t.save().then((newTag) => {
            resolve(newTag)
        }, (error) => {
            reject(error)
        })
    })
}

module.exports.getAllTags = function(){
    return new Promise(function(resolve, reject){
        Tag.find().then((tags) => {
            resolve(tags)
        }, (error) => {
            reject(error)
        })
    })
}

module.exports.getTag = function(name){
    return new Promise(function(resolve, reject){
        Tag.findOne({
            tagName: name
        }).then((tag) =>{
            resolve(tag)
        }, (error) => {
            reject(error)
        })
    })
}

module.exports.searchByTag = function(){

}