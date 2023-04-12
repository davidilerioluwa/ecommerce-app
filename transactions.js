const mongoose= require("mongoose")

var transactionSchema=new mongoose.Schema({
    username: String,
    reference: String,
    amount: Number,
    message:String,
    status:String,
    itemDetails:Array

})

module.exports=mongoose.model("transaction",transactionSchema)