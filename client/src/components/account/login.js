import react,{Component} from "react"
import axios from "axios"
import {Button} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link,Navigate} from "react-router-dom"

class Login extends react.Component{
    constructor(){
        super()
        this.state={
            loginUsername:"",
            loginPassword:"",
            authenticated:false,
            wrongPassword:false,
            accExists:"dontKnow"
        }
        this.setDetails=this.setDetails.bind(this)
        this.Login=this.Login.bind(this)
    }

    setDetails(e){
        var name=   e.target.name
        var value=   e.target.value
           this.setState({[name]:value})
    }

    Login(){
        
        const password=this.state.loginPassword
        const username=this.state.loginUsername
        const   data={
                username: username,
                password:password
            }
        axios.post("/Userslogin",data,{withCredentials:true})
        .then((res)=>{
            
            this.setState({authenticated:res.data})
            this.setState({wrongPassword:!res.data})
            
        })
        .catch((err)=>console.log(err))
    }


    render(){
        reload=this.props.reload
      const  authenticated=this.state.authenticated
       if(authenticated){
                return <Navigate to="/"/>
       }else{
        return(

            <div className="VendorsLoginForm">
                <div className="VendorsLoginFormContainer loginItem">
                <FontAwesomeIcon icon="fa-solid fa-user" className="loginUser" />
                    <span style={this.state.wrongPassword==false?{display:"none"}:{display:"inline",marginBottom:"30px",color:"red"}}>Incorrect username or password</span>
                    <input className="loginItem" placeholder="Username" name="loginUsername" type="text" onChange={this.setDetails}/> <br/>
                    <input className="loginItem" placeholder="password" name="loginPassword" type="password" onChange={this.setDetails}/> <br/>
                    {this.state.authenticated==false?<Button className={"loginItem"}  onClick={this.Login}>Login</Button>:
                    <span  className={"loginItem loggedBtn"}  onClick={this.Login}><FontAwesomeIcon icon="fa-solid fa-circle-check" className="" /></span>
                    } 
                    <Button ><Link to="/account/forgotPassword">Forgot Password</Link></Button>
                        <h4>OR</h4>
                        <Link to="/account/createAccount"><Button style={{textDecoration:"none"}} className={""} onClick={this.props.setTab}>Create Account</Button></Link>
                    
                </div>
            </div>
        )
       }

    }

}
var reload=""

export default Login