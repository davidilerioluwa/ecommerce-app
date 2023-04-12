import react,{Component} from "react"
import Img from "../../profile.jpg"
import {Button} from "react-bootstrap"

class Profile extends react.Component{

    render(){
        return(
            <div className="vendorProfileBackground">
            <div className="vendorProfile">
                <div style={{display:"flex"}}>

                
                        <div className="vendorContact">
                            <img  src={Img}/>
                            <div className="vDetails">
                                <p style={{marginBottom:"9px",fontWeight:"bolder"}}>My Details</p>
                                <span>David Godswill Ilerioluwa</span>
                                <span>+234 7017487497</span>
                                <span>davidilerioluwa199@gmail.com</span>
                                
                            </div>
                            <Button style={{marginBottom:"11px"}}>Edit Profile</Button>
                        </div>
                        <div className="vendorContact">
    
                            <div className="vDetails">
                                <p style={{marginBottom:"9px",fontWeight:"bolder"}}>Store Details</p>
                                <span>David Godswill Ilerioluwa Ventures</span>
                                <span>+234 7017487497</span>
                                <span>davidilerioluwa199@gmail.com</span>  
                            </div>
                            <div className="vDetails" style={{marginTop:"22px"}}>
                                <p style={{marginBottom:"9px",fontWeight:"bolder"}}>Location Details</p>
                                <span>David Godswill Ilerioluwa Ventures</span>
                                <span>+234 7017487497</span>
                                <span>davidilerioluwa199@gmail.com</span>  
                            </div>
                            <Button style={{marginBottom:"11px"}}>Edit Profile</Button>
                        </div>
                </div>
            </div>
            </div>
        )
    }
}
export default Profile