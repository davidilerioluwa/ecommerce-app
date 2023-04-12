import React from "react";
// import imgSrc from "../../images/shoe.jpg"
import axios from "axios"

class OrdersComponent extends React.Component{
    constructor(){
        super()
        this.state={
            order:"",
            listing:"",
            status:"delivered"
        }
    }

    componentDidMount(){
        const item=this.props.order
        this.setState({orders:item})
        const id={id:item.listingId}
        axios.post("/getListing",id)
        .then((res)=>{
            this.setState({listing:res.data}) 

        })
        .catch((err)=>console.log(err))
    }

    render(){
        const orders=this.state.orders
        const listing=this.state.listing
        if(orders && listing){
            const   listingPicture=listing.listingPicture
            console.log();
            const  imgSrc="data:image/"+listingPicture[0].contentType+";base64,"+listingPicture[0].data
            const orderDate=new Date(Number(orders.orderDate))
            console.log(orderDate.getFullYear());
            const title=(listing).listingTitle

                const status=orders.orderStatus
                var statusColor
                if(status=== "delivered"){
                    statusColor="green"
                }else if(status==="undelivered"){
                    statusColor="red"
                }
                const statusStyle={
                    backgroundColor: statusColor,
                    padding:"3px",
                    borderRadius:"3px",
                    color:"white"

                }
                return(
                    
                    <tr className="orderComponent">
                       
                        <td >
                            <img className="cartImage" src={imgSrc}/>
                            {title.toUpperCase()}
                        </td>
                        <td >      
                            {/* {this.state.updateLoading?"Loading":this.state.edit?this.inputField():this.displayNumber()} */}
                            <div style={{width:"100px"}}>
                                <p>
                                    <span style={{marginRight:"5px"}}>Quantity:</span>
                                    <span>{orders.numberOfOrders}</span>
                                </p>
                                <p>{orderDate.getDate()}-{orderDate.getMonth()+1}-{orderDate.getFullYear()}</p>
                            </div>
                        </td>
                        <td>
                            {/* ₦{itemDetails.price} */}
                            <p>#{listing.price} x {orders.numberOfOrders}</p>
                            <p style={statusStyle}>{orders.orderStatus}</p>
                        </td>
                        {/* <div style={{width:"15%"}} onClick={this.removeItem} className="toggleCartAmount">
                            <span>
                                <FontAwesomeIcon icon="fa-solid fa-trash"/>
                            </span>
                        </div> */}
                    </tr>
                )
        }else{
            return <span>loading</span>
        }
    }
}

export default OrdersComponent