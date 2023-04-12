import React,{Component} from "react";
import axios from "axios"
import {Button} from "react-bootstrap"
import { Link,Navigate } from "react-router-dom";

class CreateAccount extends React.Component{

    constructor(){
        super()
        this.state={
            username:"",
            firstname:"",
            lastname:"",
            password:"",
            confirmPassword:"",
            currentTab:"login",
            loginUsername:"",
            loginPassword:"",
            exists: false,
            checkedExists:false,
            passwordsMatch:"",
            creationSuccesful:false

        }
        this.setDetails=this.setDetails.bind(this)
        this.create=this.create.bind(this)
        this.checkUsernameExists=this.checkUsernameExists.bind(this)

    }



    checkUsernameExists(username){
        axios.post("/checkUserExists",{username:username})
        .then((res)=> {
            this.setState({checkedExists:true})
            this.setState({exists:res.data})})
        .catch((err)=>console.log(err))
    }

    setDetails(e){
        var name=   e.target.name
        var value=   e.target.value
           this.setState({[name]:value})
           if(name==="username"){
                console.log(value);
                console.log(name);
               this.checkUsernameExists(value)
           }
            if(name=="password"){
                if(this.state.confirmPassword !==value && this.state.confirmPassword){
                    this.setState({passwordsMatch:false})
                }else if(this.state.confirmPassword && this.state.confirmPassword ==value ){
                    this.setState({passwordsMatch:true})

                }
            }
           if(name=="confirmPassword"){

                if(this.state.password===value){
                    this.setState({passwordsMatch:true})
                }else{
                    this.setState({passwordsMatch:false})
                }
           }
    }

    create(){
        const username=this.state.username
        const firstname=this.state.firstname
        const lastName= this.state.lastname
        const password=this.state.password
        const data={
            username:username,
            firstname:firstname,
            lastname:lastName,
            password:password
        }
        axios.post("/createUser",data)
        .then((res)=>this.setState({creationSuccesful:res.data}))
        .catch((err)=>console.log(err))
    }

    render(){
        const creationSuccesful=this.state.creationSuccesful
        // conditions that will lead to a rejected login request
        var conditions=  (this.state.exists ||!this.state.checkedExists|| this.state.username=="" || !this.state.passwordsMatch) 
        if(creationSuccesful){
            return <Navigate to="/account/login"/>
        }else{
            return(
                <div className="VendorsLoginForm">
                <div className="VendorsLoginFormContainer loginItem">
      
                     <p style={this.state.exists?{display:"blocK",color:"red"}:{display:"none"}}>Username already exists</p>
                     <input placeholder="Username" name="username" type="text" onChange={this.setDetails}/> <br/>
                     <input placeholder="Firstname" name="firstname" type="text" onChange={this.setDetails}/>   <br/>
                     <input placeholder="Lastname" name="lastname" type="text" onChange={this.setDetails}/> <br/>
                     <input placeholder="password" name="password" type="password" onChange={this.setDetails}/> <br/>
                     <input placeholder="confirm password" name="confirmPassword" type="password" onChange={this.setDetails}/> <br/>
                     <Button onClick={this.create} disabled style={ conditions?{display:"blocK"}:{display:"none"}}>CREATE</Button><br/>
                     <Button onClick={this.create}  style={conditions?{display:"none"}:{display:"block"}}>CREATE</Button>
                     <h4>OR</h4>
                     <Link to="/account/login"><Button onClick={this.props.setTab}>Login</Button></Link>
                     
                </div>
             </div>
            )
        }
    }
}

export default CreateAccount