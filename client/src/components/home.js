import React, { Component } from "react"
import Carousel from 'react-bootstrap/Carousel';
import Background from "../images/background.jpg"
import Clothes from "../images/clothes.jpg"
import shoe from "./../images/shoe.jpg"
import shirt from "./../images/shirt.jpg"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingNavbar from "./landingNavbar"
import { Link,Navigate } from "react-router-dom";
import Loading from "./loading"



class Landing extends React.Component {
    constructor() {
        super()
        this.state = {
            redirect: null,
            popular: [1, 2],
            loading:false
        }
        this.setLoading=this.setLoading.bind(this)
        this.navigateToCategories=this.navigateToCategories.bind(this)

    }

    setLoading(){
        this.setState({loading:true})

    }

    navigateToCategories(){
        // <Navigate to="/categories/search"/>
        console.log("navigate!!");
    }



    render() {

        function myFunction(num) {
            return <Carousel.Item>
                <img
                    style={{ maxHeight: "80vh" }}
                    className="d-block w-100"
                    src={Clothes}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h1 style={{ fontSize: "50px" }}>DISCOVER THE MOST AMAZING PRODUCTS</h1>
                    <h5>Shop on the fly</h5>
                    {/* <Button onClick={this.navigateToCategories}>SHOP NOW</Button> */}
                    <Link to="/categories/search"><Button>SHOP NOW</Button></Link>
                </Carousel.Caption>
            </Carousel.Item>
        }


        var carouselItem = this.state.popular.map(myFunction)

        return (<div className="landingBackground" >
            <LandingNavbar/>
            {this.state.loading?<Loading/>:""}
            
            <div style={{ marginTop: "46px" }}>
                <div >
                    <Carousel className="carousel">
                        {carouselItem}
                    </Carousel>
                </div>

                <div style={{ marginTop: "51px", marginLeft: "auto", marginRight: "auto",display:"flex", flexWrap:"wrap",justifyContent:"center" }}>
                    
                    
                   
                    <div style={{ backgroundImage: `url(${shoe})` }}  className="homeImage" >
                        <p>
                            <h5>Shoes Collection</h5><br />
                            <Link to="/categories/search<category.clothing>"><Button variant="dark">SHOP</Button></Link>
                        </p>
                    </div>
                    <div style={{ backgroundImage: `url(${shirt})` }}  className="homeImage" >
                        <p>
                            <h5>Shoes Collection</h5><br />
                            <Button variant="dark" onClick={this.setLoading}>SHOP</Button>
                        </p>
                    </div>

                </div>

            </div>
         
        </div>)
    }
}
export default Landing