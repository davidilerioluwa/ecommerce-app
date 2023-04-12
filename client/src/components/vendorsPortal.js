import axios from "axios";
import React,{Component} from "react";
import {Link,Outlet} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VendorsAccountSetup  from './vendorsPortal/vendorsAccountSetup/vendorsAccountSetup'
import CreateListing from "./vendorsPortal/listing/createListing"


class VendorsPortal extends React.Component{
    constructor(){
        super()
        this.state={
            reload:"",
            authenticated: ""
        }
        this.reload=this.reload.bind(this)
    }

componentDidMount(){

    axios.get("/vendorApi",{withCredentials:true})
    .then((res)=>this.setState({authenticated:res.data.isAuthenticated}))
    .catch((err)=>console.log(err))
}
reload(){
    axios.get("/vendorApi",{withCredentials:true})
    .then((res)=>this.setState({authenticated:res.data.isAuthenticated}))
    .catch((err)=>console.log(err))
}

    render(){
        console.log(this.state.authenticated);
       
if(this.state.authenticated==true){
        return(
            <div className="vendorsPortalBackground"   >
                <div className="leftSideBar">
                    <div  style={{marginTop:"50px" ,marginLeft:"20px",color:"black"}}>
                        <div className="dashboardUser">
                        <FontAwesomeIcon icon="fa-regular fa-user" className="vendorAvatar" />
                        <div style={{marginTop:"9px"}}>David Godswill</div>
                        </div>
                    
                        <p><FontAwesomeIcon icon="fa-solid fa-gauge" />  <Link to="/vendorsPortal/dashboard" className="leftNavBarLinks">Dashboard</Link></p>
                        <p><FontAwesomeIcon icon="fa-solid fa-bag-shopping" />  <Link to="/vendorsPortal/listing" className="leftNavBarLinks">Listings</Link></p>
                        <p><FontAwesomeIcon icon="fa-regular fa-message" /> <Link to="" className="leftNavBarLinks">Messages</Link></p>
                        <p><FontAwesomeIcon icon="fa-regular fa-user" /><Link to="/vendorsPortal/profile" className="leftNavBarLinks">Profile</Link></p>
                        <p><FontAwesomeIcon icon="fa-solid fa-gear" /><Link to="" className="leftNavBarLinks">Account Settings</Link></p>
                    
                    </div>
                </div>

 
                <Outlet/>
            </div>
        )}else if(!this.state.authenticated){

           return <VendorsAccountSetup reload={this.reload}/>
        }
        

    }

}

export default VendorsPortal
