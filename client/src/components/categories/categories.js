import React,{Component} from "react";
import ShoppingCard from "../shoppingCard"
import LandingNavbar from "../landingNavbar"
import SearchListing from "../../searchListing"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"
import getFilterFromUrl from "./getFilterFromUrl"
import {Link} from "react-router-dom"

class Categories extends React.Component{
    constructor(){
        super()
        this.state={
            listings:[2,2],
            search:"",
            filterOptions:""
        }

        this.search=this.search.bind(this)
        this.onChange=this.onChange.bind(this)
        this.filter=this.filter.bind(this)
        this.createUrl=this.createUrl.bind(this)
        
    }
    componentDidMount(){
       const  url=this.props.params.id
      
   
    //     const filtersParams=["startingPrice","endingPrice","vate"]
        
    //     const filterOptions=getFilterFromUrl(filtersParams,url)
       
    //     this.setState({filterOptions:filterOptions}) 
    //     console.log(filterOptions);const  url=this.props.params.id
            // setTimeout(() => {
            //     console.log(url)
            // const filtersParams=["startingPrice","endingPrice","category"]
            // const filterOptions=getFilterFromUrl(filtersParams,url)
            // this.setState({filterOptions:filterOptions})
            // console.log(this.state);
            // }, 0);


        
        this.search()
        
    }
    onChange(e){
        const  name=e.target.name
        const value=e.target.value
        this.setState({[name]:value})
      }
  
   
    onChange(e){
        const  name=e.target.name
        const value=e.target.value
        this.setState({[name]:value})
      }
      filter(filter){
        //this function is passed down as props
              this.setState({filterOptions:filter})
              console.log(filter);   
      }
  
      search(){
        setTimeout(() => {
            const  url=this.props.params.id
            console.log(url)
            const filtersParams=["startingPrice","endingPrice","category"]
            const filterOptions=getFilterFromUrl(filtersParams,url)
           
           
            const searchQuery= getFilterFromUrl(["searchQuery"],url)
            
              const search=[
                searchQuery.searchQuery ,
                 filterOptions
              ]
             console.log(search);
              
        axios.post("/getUserListings",search)
        .then((res)=>{
              this.setState({listings:res.data})
              
            //   this.setState({searchedListing:res.data.search})
          })
          .catch((err)=>console.log(err))
          
        }, 0);
       
      
      }
    createUrl(filter){
        if(filter=="search"){
            const searchQuery=this.state.search
            searchQuery ?newUrl=newUrl+"<"+"searchQuery."+searchQuery+">":newUrl=newUrl
        }else{
                 const filterOptions=this.state.filterOptions
                    filterOptions[filter] ?newUrl=newUrl+"<"+filter+"."+filterOptions[filter]+">":newUrl=newUrl
        }
        
    }
  componentDidUpdate(prevProps){
   
    if(prevProps.params.id !== this.props.params.id){
        this.search()
    }
  }

render(){
    
    newUrl="/categories/search"
   this.createUrl("category")
   this.createUrl("startingPrice")
   this.createUrl("endingPrice")
   this.createUrl("search") 

    const shoppingCards=this.state.listings.map((x)=>{
        return  <ShoppingCard props={x} />
      })
   
    return(
        <div style={{position:"absolute"}}>
            <LandingNavbar  />
            <SearchListing filter={this.filter}  search={this.state.search} filterOptions={this.state.filterOptions} newUrl={newUrl} />
            <div className="searchBar">
                <input name="search" type={"search"} onChange={this.onChange}  style={{marginRight:"11px"}} />
                <Link to={newUrl} onClick={this.reload}>
                    <FontAwesomeIcon icon="fa-solid fa-search" />
                </Link> 
                <span  onClick={this.changeDisplay}>
                    <FontAwesomeIcon icon="fa-solid fa-filter" />
                </span> 
            </div>
            
            
            <div className="listings" >
                {shoppingCards}
            </div>
        </div>
    )
}
}
export default Categories
var newUrl=""