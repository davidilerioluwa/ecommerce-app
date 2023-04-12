import react,{Component} from "react"
import axios from "axios"
import {Button} from "react-bootstrap"


class VendorsCreate extends react.Component{
    constructor(){
        super()
        this.state={
            username:"",
            firstname:"",
            lastname:"",
            password:"",
            currentTab:"login",
            loginUsername:"",
            loginPassword:"",
            exists: false

        }
        this.setDetails=this.setDetails.bind(this)
        this.create=this.create.bind(this)
        this.checkUsernameExists=this.checkUsernameExists.bind(this)

    }



    checkUsernameExists(username){
        axios.post("/checkVendorExists",{username:username})
        .then((res)=> this.setState({exists:res.data}))
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
        axios.post("/create",data)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
}

render(){
    return(
        <div className="VendorsLoginForm">
           <div className="VendorsLoginFormContainer loginItem">
 
                <p style={this.state.exists?{display:"blocK",color:"red"}:{display:"none"}}>Username already exists</p>
                <input placeholder="Username" name="username" type="text" onChange={this.setDetails}/> <br/>
                <input placeholder="Firstname" name="firstname" type="text" onChange={this.setDetails}/>   <br/>
                <input placeholder="Lastname" name="lastname" type="text" onChange={this.setDetails}/> <br/>
                <input placeholder="password" name="password" type="password" onChange={this.setDetails}/> <br/>
                <input placeholder="confirm password" name="ConfirmPassword" type="password" onChange={this.setDetails}/> <br/>
                <Button onClick={this.create} disabled style={this.state.exists?{display:"blocK"}:{display:"none"}}>CREATE</Button><br/>
                <Button onClick={this.create}  style={this.state.exists?{display:"none"}:{display:"block"}}>CREATE</Button>
                <h4>OR</h4>
                <Button onClick={this.props.setTab}>Login</Button>
           </div>
        </div>

    )
}


}

export default VendorsCreate