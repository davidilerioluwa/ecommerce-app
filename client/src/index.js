import react from 'react'
import ReactDOM from 'react-dom'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './fontawesome';
import App from "./components/App"
import VendorsPortal from "./components/vendorsPortal"
import Listing from "./components/vendorsPortal/listing/listing"
import Dashboard from "./components/vendorsPortal/dashboard"
import Profile from "./components/vendorsPortal/profile"
import Home from "./components/home"
import Categories from "./components/categories/categoriesComponent"
// import SearchListing from "./components/searchListing"
import Cart from "./components/cart/cart"
import CreateAccount from "./components/account/createAccount"
import Login from "./components/account/login"
import AccountSettings from "./components/account/accountSettings"
import Orders from "./components/account/orders"
import Flutter from "./components/cart/flutter"




export default function Test (){
    return(
           <BrowserRouter>
           <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="/categories/:id" element={<Categories/>} />
                    <Route path="/vendorsPortal" element={<VendorsPortal/>}>
                         <Route index element={<Listing/>}/>
                        <Route path="dashboard" element={<Dashboard/>} />
                        <Route path="listing" element={<Listing/>}/>
                        <Route path="profile" element={<Profile/>}/>
                    </Route>

                    <Route path="/account">
                        <Route path="cart" element={<Cart/>} />
                        <Route path="createAccount" element={<CreateAccount/>}/>
                        <Route path="Login" element={<Login/>}/>
                        <Route path="pay" element={<Flutter/>}/>
                        <Route path="accountSettings" element={<AccountSettings/>}/>
                        <Route path="orders" element={<Orders/>}/>
                    </Route>
                    
               
           </Routes>
           </BrowserRouter>
           
            )

}


ReactDOM.render(
<Test/>,document.getElementById("root")
)
{/* <Authenticator/> */}

