import react,{Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CreateListing from "./createListing"
import ListingComponent from "./listingComponent"
import SearchFilter from "./searchFilter"
import axios from "axios"

class Listing extends react.Component{
    constructor(){
        super()
        this.state={
            active:"",
            search:"",
            listings:[],
            noOfListings:"",
            searchedListing:[],
            display:true,
            filterOptions:""
        }
        this.reload=this.reload.bind(this)
        this.search=this.search.bind(this)
        this.onChange=this.onChange.bind(this)
        this.changeDisplay=this.changeDisplay.bind(this)
        this.filter=this.filter.bind(this)
        
    }
    componentDidMount(){
        axios.get("/getAllListings",{withCredentials:true})
        .then((res)=>{
            this.setState({noOfListings:res.data.length})
            this.setState({listings:res.data})})
        .catch((err)=>console.log(err))
    }
    reload(){
        axios.get("/getAllListings",{withCredentials:true})
        .then((res)=>this.setState({listings:res.data}))
        .catch((err)=>console.log(err))
        console.log("done");
    }

    onChange(e){
      const  name=e.target.name
      const value=e.target.value
      this.setState({[name]:value})

    }
    filter(filter){
            this.setState({filterOptions:filter})
            this.search()
    }

    search(){
        console.log(this.state);
        
        const search=[
           this.state.search,
           this.state.filterOptions
        ]
        axios.post("/vendorSearchListings",search,{withCredentials:true})
        .then((res)=>{
            this.setState({listings:[]})
            this.setState({searchedListing:res.data.search})
        })
        .catch((err)=>console.log(err))
    }
    changeDisplay(){
        this.setState({display:!this.state.display})
     }

    render(){
    const    listings=this.state.listings
    const    searchedListing=this.state.searchedListing
  
    const x= listings.map((id)=>{
        return <ListingComponent id={id._id}/>
    })
    const y= searchedListing.map((id)=>{
      
        return <ListingComponent id={id._id}/>
    })
    

        return(
            
            <div className="vendorsMain">
                <div  style={this.state.display?{display:"block"}:{display:"none"}}>
                <SearchFilter changeDisplay={this.changeDisplay} filter={this.filter} />
                </div>
                
            <div className="searchBar">
                <input name="search" type={"search"} onChange={this.onChange}  style={{marginRight:"11px"}} />
                <span onClick={this.search}>
                    <FontAwesomeIcon icon="fa-solid fa-search" />
                </span> 
                <span  onClick={this.changeDisplay}>
                    <FontAwesomeIcon icon="fa-solid fa-filter" />
                </span> 
            </div>
                <div className="vendorsMainTab">
                    <CreateListing reload={this.reload} numberOfListings={this.state.noOfListings} />
                    {x}
                    {y}
                </div>
            </div>
        )
    }
}
export default Listing