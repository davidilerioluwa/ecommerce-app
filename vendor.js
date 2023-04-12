const mongoose= require("mongoose")

// to set up the vendors database
var vendorSchema= new mongoose.Schema({
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
        default:"vendor"
    }
})
// socialSchema.plugin(passportLocal)
module.exports= mongoose.model("vendor", vendorSchema)