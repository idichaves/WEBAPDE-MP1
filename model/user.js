const mongoose = require("mongoose")

var UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength: 4
    },

    password:{
        type:String,
        required:true,
        minlength: 8
    },

    desc:{
        
    },

    posts:{
        
    }
})

var User = mongoose.model("user", UserSchema)

module.exports = {
    User
}