import React,{Component} from "react";
import TotalSales from "./dashboard/totalSales"
import SellerRank from "./dashboard/sellerRank"
import TotalCarts from "./dashboard/totalCarts"
import SellerScore from "./dashboard/sellerScore"
import BarChart from "./dashboard/barChart"


class Dashboard extends React.Component{



    render(){

        return(
            <div className="vendorsMain" style={{width:"100%-200px",right:0}}>
                <div  className="dashboardAbove">
                    <TotalSales/>
                    <SellerRank/>
                    <TotalCarts/>
                    <SellerScore/>
                </div>
               
            </div>
            
        )
    }
}
export default Dashboard