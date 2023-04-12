import React from "react";
import { Link, Outlet, Redirect } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import axios from "axios"

class LandingNavbar extends React.Component{
    constructor(){
        super()
        this.state={
            authenticated:true
        }
    }

    componentDidMount(){
axios.get("/api")
.then((res)=>this.setState({authenticated:res.data.isAuthenticated}))
.catch((err)=>console.log(err))
    }

    render(){

        return(
            <div className="landingNavbar">
                <strong><Link to="/" className="navBarLinks">Home</Link> </strong>
                <strong><Link to="/categories/search" className="navBarLinks">Categories</Link> </strong>
                <strong className="navBarLinks"><Link to="/account/cart" className="navBarLinks">Cart</Link> </strong>
                <strong className="accountDropdown">
                    {/* <span className="navBarLinks accountDropdown">Account
                        <div className="accountDropdownMenu" >
                            <div><Link to="/account/cart" className="accountDropdownMenuLinks" >Cart</Link></div>
                            <div><Link to="/account/accountSettings" className="accountDropdownMenuLinks" >Account settings</Link></div>
                            <div><Link to="/account/cart" className="accountDropdownMenuLinks">Cart</Link></div>
                        </div> 
                    </span> */}
                    
                </strong>
                
               {!this.state.authenticated? <strong className="right moveR"><Link to="/account/login" className="navBarLinks "> <Button style={{ marginTop: "-8px" }}  >LOGIN</Button></Link> </strong>:""}
            </div>
        )
    }
}

export default LandingNavbar