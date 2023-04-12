import react,{Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class SellerScore extends react.Component{

    render(){
        return(
            <div className="dashboardAboveComponent" style={{backgroundColor:"#fbd9e5",color:"#ff0c61"}} >
                <div>
                <FontAwesomeIcon className="dashboardAboveComponentIcon" icon="fa-solid fa-cart-shopping" style={{backgroundColor: "#fea9c7"}} />
                <strong style={{fontSize:"35px"}}>99%</strong>
                <p>SellerScore</p>
                </div>
            </div>

        )
    }
}
export default SellerScore