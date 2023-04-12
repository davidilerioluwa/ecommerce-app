import React from "react";
import {useParams} from "react-router-dom"
import Categories from "./categories"

function CategoriesComponents(){
const params= useParams()
    return(
        <div>
            <Categories params={params} />
        </div>
    )
}

export default CategoriesComponents