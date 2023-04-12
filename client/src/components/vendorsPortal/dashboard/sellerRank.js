import react,{Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class SellerRank extends react.Component{

    render(){
        return(
            <div className="dashboardAboveComponent" style={{backgroundColor:"#9bfbdb",color:"green"}} >
                <div>
                <FontAwesomeIcon className="dashboardAboveComponentIcon" icon="fa-solid fa-ranking-star" style={{backgroundColor: "#58ffc7"}} />
                <strong style={{fontSize:"35px"}}>12th</strong>
                <p>SellerRank</p>
                </div>
            </div>

        )
    }
}
export default SellerRank