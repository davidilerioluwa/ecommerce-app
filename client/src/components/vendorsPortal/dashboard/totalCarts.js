import react,{Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class SellerRank extends react.Component{

    render(){
        return(
            <div className="dashboardAboveComponent" style={{backgroundColor:"#ffe69a",color:"#b99202"}} >
                <div>
                <FontAwesomeIcon className="dashboardAboveComponentIcon" icon="fa-solid fa-cart-shopping" style={{backgroundColor: "#b992021e"}} />
                <strong style={{fontSize:"35px"}}>122</strong>
                <p>Total Carts</p>
                </div>
            </div>

        )
    }
}
export default SellerRank