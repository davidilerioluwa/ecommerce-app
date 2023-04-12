import react from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class CartComponent extends react.Component{
    constructor(){
        super()
        this.state={
            cartDetails:"",
            itemDetails:"",
            edit:false,
            newNumber:0,
            updateLoading:false,
            checked: false,
            item:[]
           
        }
        this.inputField=this.inputField.bind(this)
        this.displayNumber=this.displayNumber.bind(this)
        this.changeDisplay=this.changeDisplay.bind(this)
        this.onChange=this.onChange.bind(this)
        this.updateCart=this.updateCart.bind(this)
        this.changeCheckout=this.changeCheckout.bind(this)
        
    }


    componentDidMount(){

        addToCheckout=this.props.addToCheckout
        removeFromCheckout=this.props.removeFromCheckout


      const  id=this.props.id
        axios.post("/getCartItemDetails",{listingId:id})
        .then((res)=>{this.setState({cartDetails:res.data})
                      this.setState({numberOfOrders:res.data.numberOfOrders})

                      axios.post("/getListing",{id:id})
                      .then((res)=>{this.setState({itemDetails:res.data})
                      const item={
                        id: res.data._id,
                        price:res.data.price,
                        numberOfOrders:this.state.numberOfOrders

                      }
                     
                      
                    })
                      .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err))

            
       
    }
    inputField(){
        const style={
            width:"20px",
        }
        return(
            <span className="toggleCartAmount">
                <input  name="newNumber" onChange={this.onChange} style={style} value={this.state.newNumber}/>
                <span onClick={this.updateCart}>
                    <FontAwesomeIcon icon="fa-solid fa-check"/>
                </span>
                <span onClick={this.changeDisplay}>
                    <FontAwesomeIcon icon="fa-solid fa-xmark"/>
                </span>
            </span>
        )
    }
    onChange(e){
       const name= e.target.name
       const value= e.target.value
        const val=Number(value)
        console.log(val);
        console.log(!isNaN(val));
       if(!isNaN(val) && val>=0){
            this.setState({[name]:value})
       }
    }

    updateCart(){
        this.setState({updateLoading:true})
        const newCartDetails={
            id: this.state.itemDetails._id,
            numberOfOrders: this.state.newNumber
        }
       
        axios.post("/updateCart",newCartDetails)
        .then((res)=>{if(res){
            this.setState({updateLoading:false})
            this.setState({numberOfOrders:res.data})
            this.changeDisplay()
            
            this.changeCheckout("notACheck")


            const item={
                id: this.state.itemDetails._id,
                price:this.state.itemDetails.price,
                numberOfOrders:this.state.numberOfOrders

              }
              
              

        }})
        .catch((err)=>console.log(err))

       
    }
    changeDisplay(){
        this.setState({edit:!this.state.edit})
    }
    displayNumber(){
            return(
                <span className="toggleCartAmount"> 
                    <span>{this.state.numberOfOrders}</span>
                    <span onClick={this.changeDisplay}>
                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square"/>
                    </span>
                </span>
            )
    }
    changeCheckout(check){
        const item={
            id: this.state.itemDetails._id,
            price:this.state.itemDetails.price,
            numberOfOrders:this.state.numberOfOrders

          }
     
       if(check=="notACheck"){

       }else{
        this.setState({checked:!this.state.checked})
       }

       setTimeout(() => {

            console.log(this.state.checked);
            if(this.state.checked){
                console.log("checked");
                addToCheckout(item)
            }else{
                console.log("unchecked");
                removeFromCheckout(item)
            }
        
       }, 20);
    }

    render(){
        
        const itemDetails=this.state.itemDetails
        const listingPicture=itemDetails.listingPicture
       if(listingPicture){
         const  imgSrc="data:image/"+listingPicture[0].contentType+";base64,"+listingPicture[0].data
         return(
            <div className="cartComponent">
                 <div style={{margin:"10px"}}>
                            <input type={"checkbox"} onChange={this.changeCheckout}/>
                </div>
                <div style={{width:"20%"}}>
                    <img className="cartImage" src={imgSrc}/>
                </div>
                <div style={{width:"30%"}}>
                    {itemDetails.listingTitle.toUpperCase()}
                </div>
                <div style={{width:"15%"}}>      
                    {this.state.updateLoading?"Loading":this.state.edit?this.inputField():this.displayNumber()}
                </div>
                <div style={{width:"15%"}}>
                    ₦{itemDetails.price}
                </div>
                <div style={{width:"15%"}} onClick={this.removeItem} className="toggleCartAmount">
                    <span>
                        <FontAwesomeIcon icon="fa-solid fa-trash"/>
                    </span>
                </div>
            </div>
        )
       }
        return(
            <div className="categoriesComponent">
                Component
            <span onClick={this.updateCart}>+</span>
            </div>
        )
    }
}
var addToCheckout
var removeFromCheckout
export default CartComponent