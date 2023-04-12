import react from "react"
import axios from "axios"
import LandingNavbar from "../landingNavbar"
import OrdersComponents from "./ordersComponent"

class Orders extends react.Component{

    constructor(){
        super()
        this.state={
            transactions:[],
            orders:[]
        }
    }

    componentDidMount(){
        // axios.get("/getTransactions",{withCredentials:true})
        // .then((res)=>{
        //     console.log(res);
        //     this.setState({transactions:res.data})})
        // .catch((err)=>console.log(err))

        axios.get("/getOrders",{withCredentials:true})
        .then((res)=>{
            console.log(res);
            this.setState({orders:res.data})})
        .catch((err)=>console.log(err))
    }

    render(){
        const orders=this.state.orders
        console.log(orders);
        const Orders=orders.map((order)=>{return  ( <OrdersComponents order={order}/>)})
        
        

           return(<div >
                    <LandingNavbar/>
                    <div style={{paddingTop:"100px"}}>
                        <div className="ordersItemsHeading" >
                            <strong>UNDELIVERED ORDERS</strong>
                            <strong>3 ITEMS</strong>
                        </div>
                        <table className="ordersItems">
                            {/* <tr>
                                <th style={{width:"30%"}}>Item Details</th>
                                <th style={{width:"15%"}}> Quantity</th>
                                <th style={{width:"15%"}}>Price</th>
                            </tr> */}
                            {Orders}
                        </table>
                    </div>
                </div>)
    }
}
export default Orders