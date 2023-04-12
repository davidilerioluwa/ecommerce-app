import React  from "react";

class Loading extends React.Component{

    render(){
        return(
            <div className="loading">
                   <div>
                        <span class="dot" ></span>
                        <span class="dot" ></span>
                        <span class="dot" ></span>
                        <span class="dot" ></span>
                   </div>
            </div>
        )
    }
}

export default Loading