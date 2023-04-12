import react,{Component} from "react"
import NumberOfListings from "./numberOfListings"
import {Button} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"

class CreateListing extends react.Component{

    constructor(){
        super()
        this.state={
            listingTitle:"",
            listingDescription:"",
            category:"others",
            image:"",
            price:""

        }
        this.onChange=this.onChange.bind(this)
        this.CreateListing=this.CreateListing.bind(this)
    }


    onChange(e){
        e.preventDefault()
        var name= e.target.name
        var value= e.target.value
     if(name=="image"){
        this.setState({image:e.target.files[0]})
     }else{
        this.setState({[name]:value})
        console.log(this.state);
     }
    }
    CreateListing(e){
        e.preventDefault()
     const   data= new FormData
        const image= this.state.image
        const category=this.state.category
        const listingTitle= this.state.listingTitle
        const listingDescription=this.state.listingDescription
        const price= this.state.price

     data.append("file", image)
     data.append("category",category)
     data.append("listingTitle", listingTitle)
     data.append("listingDescription", listingDescription)
     data.append("price", price)
     console.log(data);
     axios.post("/createListing",data,{withCredentials:true})
     .then((res)=>{reload()})
     .catch((err)=>console.log(err))

    }


render(){
    
    console.log(reload);
    reload=this.props.reload
    return(
     <div className="rightSideBar" >

        <div className="createListing" >
            <input placeholder="Listing Title" name="listingTitle" className="vendorsMainTabItem" type={"text"} onChange={this.onChange}/>
            <input placeholder="Listing description" name="listingDescription" className="vendorsMainTabItem" type={"text"} onChange={this.onChange}/>
            <label for="category" style={{marginRight:"10px"}} >  Category:</label>
                <select style={{marginBottom:"10px"}} name="category" id="category" onChange={this.onChange}>
               `` <option value="others">Others</option>
                    <option value="clothing">Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="automobiles">Automobiles</option>
                    <option value="grocery">Grocery</option>
                    <option value="consumables">Consumables</option>
                </select>
            
            <input placeholder="Enter price" name="price" type={"number"} onChange={this.onChange}/>
            <label for="image">
            <FontAwesomeIcon icon="fa-solid fa-image" /> select image
                <input style={{display:"none"}} id="image" name="image" type={"file"} accept="image/*" onChange={this.onChange}/>
            </label>
            <Button className="vendorsMainTabItem" onClick={this.CreateListing}>Create Listing</Button>
        </div>
        <NumberOfListings numberOfListings={this.props.numberOfListings}/>
        
     </div>
    )
}

}
var reload=""
export default CreateListing
