import react,{Component} from "react"
import VendorsCreate from "./vendorsCreate"
import VendorsLogin from "./vendorsLogin"

class VendorsAccountSetup extends react.Component{
    constructor(){
        super()
        this.state={
            currentTab:"login",
        }
        this.setTab=this.setTab.bind(this)
    }


    setTab(){
        if(this.state.currentTab=="login"){
            this.setState({currentTab:"create"})
        }else{
            this.setState({currentTab:"login"})
        }
    }

    render(){
        reload=this.props.reload
if(this.state.currentTab=="create"){
        return(
            <VendorsCreate setTab={this.setTab}/>
)
}else if(this.state.currentTab=="login"){
    return(
      <VendorsLogin setTab={this.setTab} reload={reload}/>
     
    )}
 }
}
var reload=""
export default VendorsAccountSetup