const mongoose= require("mongoose")

var orderSchema=new mongoose.Schema({
    username: String,
    orderId: String,
    orderStatus:String,
    orderDate:String,
    listingId: String,
    numberOfOrders: String

})

module.exports=mongoose.model("order",orderSchema)