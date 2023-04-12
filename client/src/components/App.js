import React,{Component} from 'react'
import {Link,Outlet} from "react-router-dom"

class App extends React.Component{
render(){
  return <div>

<Outlet/>
  </div>

}
}

export default App