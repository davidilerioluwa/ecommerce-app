import react,{Component} from "react"
import chair from "../../../download.jfif"
import {Button} from "react-bootstrap"
import axios from "axios"


class listingComponent extends react.Component{

    constructor(){
        super()
        this.state={
            counter:0,
            listing:""
        }
    }
    componentDidMount(){
       
        axios.post("/getListing",{id:this.props.id},{withCredentials:true})
        .then((res)=>{
            this.setState({listing:res.data})})
        .catch((err)=>console.log(err))

    }

    render(){
        const listing=this.state.listing
     const   listingPicture=listing.listingPicture
     
        if(listingPicture){

        
    var imgSrc=""
   
    if(listingPicture){  imgSrc="data:image/"+listingPicture[0].contentType+";base64,"+listingPicture[0].data}

        return(
            <div className="listingComponent" >
                <img src={imgSrc} alt="chair" />
                <span style={{fontSize:"20px"}}> </span> {listing.listingTitle}<br/>
                <p style={{fontSize:"16px"}}>₦{listing.price} </p>
                <Button style={{fontSize:"12px",padding:"4px"}}>Edit Listing</Button>
            </div>
        )}else{
            return("")
        }
    }
}
export default listingComponent