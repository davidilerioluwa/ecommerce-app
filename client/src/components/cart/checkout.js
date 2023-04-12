import react from "react"
import {Button} from "react-bootstrap"
import axios from "axios"
import { usePaystackPayment } from 'react-paystack';
import { alignPropType } from "react-bootstrap/esm/types";
// import Flutter from "./flutter"

class Checkout extends react.Component{
    constructor(){
        super()

        this.flutter=this.flutter.bind(this)
    }


   
    flutter(){
        axios.post("/pay","x")
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
    }

    render(){
        var itemsPurchased=this.props.itemsPurchased
        // to convert from naira to kobo
        const totalAmount=this.props.totalAmount*100
        const config = {
            reference: (new Date()).getTime().toString(),
            email: "user@example.com",
            amount: totalAmount,
            publicKey: 'pk_test_94e129fc53a521dafc9f1dcff6280a5c5ed26b03',
        };
        

  function onSuccess(trans){
    
   const transactionDetails={
        reference: trans.reference,
        status: trans.status,
        message: trans.message,
        amount: totalAmount,
        itemDetails:itemsPurchased,
        transactionDate:(new Date()).getTime().toString()
    }
    itemsPurchased.forEach((itemsPurchased,index) => {
        
        itemsPurchased.orderStatus="undelivered"
        itemsPurchased.orderId=trans.reference+index
        itemsPurchased.orderDate=(new Date()).getTime().toString()
    });
    const orders=itemsPurchased
    console.log(orders);

    // axios.post("/pay",transactionDetails)
    // .then((res)=>console.log(res))
    // .catch((err)=>console.log(err))

    axios.post("/createOrder",orders)
    .then((res)=>console.log(res))
    .catch((err)=> console.log(err))
  }
  function onClose(x){
    // console.log(x);
    // console.log(itemsPurchased)
  }
  
  const PaystackHook = () => {
      const initializePayment = usePaystackPayment(config);
      return (
        
            <Button style={{margin:"20px"}}  onClick={() => {
                initializePayment(onSuccess, onClose)
                console.log(config)}
                }>Proceed to payment</Button>
        
      );
  };

        return(
            <div className="checkout">
                <h2>Checkout</h2>
                <div>
                    <span>Items:</span>
                    <span>{this.props.itemsPurchased.length}</span>
                </div>
                <div>
                    <span>Total Price:</span>
                    <span>{this.props.totalAmount}</span>
                </div>
                <PaystackHook />
            </div>
        )
    }
}

export default Checkout