import React,{Component} from "react";
import axios from "axios"
import shoe from "./../images/shoe.jpg"
import {Button} from "react-bootstrap"


class ShoppingCard extends React.Component{
    constructor(){
        super()
        this.addToCart=this.addToCart.bind(this)
    }

    addToCart(){
        axios.post("/addToCart",{listingId:this.props.props._id},{withCredentials:true})
        .then((res)=>{console.log(res)})
        .catch((err)=>console.log(err))
        // console.log(added);
        
    }

render(){
    const listing=(this.props.props)
    const   listingPicture=listing.listingPicture
   if(listingPicture){
   
    const  imgSrc="data:image/"+listingPicture[0].contentType+";base64,"+listingPicture[0].data
      return(
          
          <div className="shoppingCard">
              <img src={imgSrc} />
              <div>
                  <h5>{listing.listingTitle.toUpperCase()} </h5>
                  <h6>#{listing.price} </h6>
                  <Button>Buy Now</Button>
                  <Button onClick={this.addToCart}>Add to Cart </Button>
              </div>
          </div>
      )
   }else{
    return("")
   }
}
}
export default ShoppingCard