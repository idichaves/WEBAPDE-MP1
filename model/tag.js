const mongoose = require("mongoose")

var TagSchema = mongoose.Schema({
    tagName:{
        type:String,
        required:true
    }
})

var Tag = mongoose.model("tag", TagSchema)

module.exports = {
    Tag
}