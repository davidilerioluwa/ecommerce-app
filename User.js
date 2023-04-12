const mongoose= require("mongoose")

// to set up the users database
var userSchema= new mongoose.Schema({
    username: String,
    password:String,
    userInfo:{
        firstname: String,
        lastname:String,
        dob: String,
        profilePicture:Object,
        username:String
    },
    accountType:{
        type:String,
        default:"user"
    }
})

module.exports= mongoose.model("user", userSchema)