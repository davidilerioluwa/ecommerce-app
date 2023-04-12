import react,{Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class numberOfListings extends react.Component{


    render(){
        console.log(this.props);
        return(
            <div className="numberOfListings">
                <div>
                <FontAwesomeIcon icon="fa-solid fa-bag-shopping" className="numberOfListingsIcon"/> 
                    <strong style={{fontSize:"35px"}}>{this.props.numberOfListings} </strong>
                    <p >Listings</p>
                </div>
                
            </div>
        )
    }
}
export default numberOfListings