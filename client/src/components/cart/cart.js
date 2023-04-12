import React,{Component}  from "react";
import axios from "axios"
import LandingNavbar from "../landingNavbar";
import CartComponent from "./cartComponent"
import Checkout from "./checkout"
import Loading from "../loading"
import {Navigate} from "react-router-dom"

class Cart extends React.Component{
    constructor(){
        super()
        this.state={
            cart:[],
            checkout:[],
            numberOfItems:0,
            totalAmount:0,
            isAuthenticated:"loading",
            edit:true
        }
        this.reload=this.reload.bind(this)
        this.calculateCheckout=this.calculateCheckout.bind(this)
        this.addToCheckout=this.addToCheckout.bind(this)
        this.removeFromCheckout=this.removeFromCheckout.bind(this)
    }

    componentDidMount(){
        
        axios.get("/getCart",{withCredentials:true})
        .then((res)=>{
            console.log(res);
            this.setState({cart:res.data})})
        .catch((err)=>console.log(err))

        axios.get("/api")
        .then((res)=>{
            this.setState({isAuthenticated:res.data.isAuthenticated})
            console.log(this.state.isAuthenticated)
        })        
        .catch((err)=>console.log(err))
    }

    addToCheckout(newItem){
        const items=this.state.checkout
        function findAndReplace(id,arr){
            const  index=arr.findIndex(
                (item)=>{
                    return  item.id==id
                  }
            )
            const length=items.length
            const before=items.slice(0,index)
            const after=items.slice(index+1,length)
            const all= before.concat(after)
            console.log(newItem);
            all.push(newItem)
            console.log(all);
            return all
           }
        
        
        
        // const exists checks if that items exists in the checkout
        const exists=  items.find((item)=>{
            return  item.id==newItem.id
          })
          if(exists){
            // setTimeout(() => {
            //     console.log(this.state.checkout);
            // }, 200);
            console.log(items);
            const id= newItem.id
            const arr= items
           const all=findAndReplace(id,arr)
            this.setState({checkout:all})
            this.calculateCheckout(all)
            


          }else{
            items.push(newItem)
            this.setState({checkout:items})
            this.calculateCheckout(items)
          }
          
    }

    removeFromCheckout(newItem){
        const items=this.state.checkout
        const exists=  items.find((item)=>{
            return  item.id==newItem.id
          })
          if(exists){

          }
        function findAndRemove(id,arr){
            const  index=arr.findIndex(
                (item)=>{
                    return  item.id==id
                  }
            )
            const length=items.length
           
            const before=items.slice(0,index)
            const after=items.slice(index+1,length)
            const all= before.concat(after)
                
            return all
        }
        // console.log(id);
        const id= newItem.id
        const arr= items
       
       const all=findAndRemove(id,arr)
       console.log(all);
        this.setState({checkout:all})
        this.calculateCheckout(all)
    
    }
    reload(){
        axios.get("/getCart")
        .then((res)=>{
            console.log(res);
            this.setState({cart:res.data})})
        .catch((err)=>console.log(err))
    }
    calculateCheckout(items){
        var totalAmount=0
        var numberOfItems=0
      
        if(items.length==0){
            totalAmount=0
            this.setState({totalAmount:totalAmount})
            console.log(items.length);
        }else{
            items.forEach((item)=>{
                numberOfItems=numberOfItems+Number(item.numberOfOrders)
                totalAmount=totalAmount+(item.price*Number(item.numberOfOrders))
                this.setState({totalAmount:totalAmount})
                this.setState({numberOfItems:numberOfItems})
            })
        }
  }



   render(){
        if(this.state.isAuthenticated==true){
          
                const cart= this.state.cart
                console.log(cart)
            const Cart=cart.map((cartItem)=>{
                
             return  (
                <div className="cartItems">
                    <div className="cartItemsHeading">
                        <div style={{width:"20%"}}></div>
                        <div style={{width:"30%"}}>Item Details</div>
                        <div style={{width:"15%"}}> Quantity</div>
                        <div style={{width:"15%"}}>Price</div>
                        <div style={{width:"15%"}}>Remove</div>
                        
                        
                    </div>
                    <CartComponent id={cartItem.listingId} reload={this.reload} addToCheckout={this.addToCheckout} removeFromCheckout={this.removeFromCheckout}/>
                    {/* <CartComponent/> */}
                </div>
             )
            })
            return(
                <div style={{position:"absolute"}}>
                    <LandingNavbar/>
                    <Checkout itemsPurchased={this.state.checkout} totalAmount={this.state.totalAmount}/>
                    <div className="cart" >
                        <div className="cartHeading">
                            <strong>SHOPPING CART</strong>
                            <strong>4 ITEMS</strong>
                        </div>
                        {Cart}
                    </div>
                    
                    
                </div>
            )
        }else if(!this.state.isAuthenticated){
            console.log(this.state.isAuthenticated);
            return(<Navigate to="/account/login"/>)
            // return(<div></div>)
        }else if(this.state.isAuthenticated=="loading"){
            return(<div><Loading/></div>)
        }
   } 
}
export default Cart