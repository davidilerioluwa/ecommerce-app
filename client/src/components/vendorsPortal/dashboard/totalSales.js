import react,{Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class TotalSales extends react.Component{

    render(){
        return(
            <div className="dashboardAboveComponent" >
                <div>
                <FontAwesomeIcon className="dashboardAboveComponentIcon" icon="fa-solid fa-money-check-dollar" />
                <strong style={{fontSize:"35px"}}>124</strong>
                <p>Total Sales</p>
                </div>
            </div>

        )
    }
}
export default TotalSales