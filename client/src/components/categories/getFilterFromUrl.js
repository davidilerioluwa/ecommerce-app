import React from "react";


// the params should be in the form of an array 
//  and the url should contain params and values in the form:
//  <startingPrice.550><endingPrice.20000>
// sample params: filtersParams=["startingPrice","endingPrice","category"]
 // sample url: <startingPrice.550><endingPrice.20000>
//  calling getFilterFromUrl(filtersParams,url) gives {startingPrice:"550",endingPrice:"20000"} as the result
function getFilterFromUrl(filtersParams,url){
    var filtersAndValues={}
    filtersParams.forEach((filter)=>{
        if(url.search(filter)!==-1){
            // a search index value of -1 means the filer param does not exist
            urlSearch(filter) 
            
            
        }
        })


        function urlSearch(filter) {
            
       
            const re=/>/g
            // fnsl means filer name starting location
            const fnsl= url.search(filter)
            const fvsl= filter.length+fnsl+1
            
            const bracketPositions=[]
            let match 
            let fvel
            while((match=re.exec(url)) !==null){
                bracketPositions.push(match.index)
                
            }
            const mainBracketPosition= bracketPositions.find((x)=>x>fvsl)
            fvel= mainBracketPosition-1
            
            const value= url.slice(fvsl,fvel+1)
            filtersAndValues[filter]=value
            console.log(filtersAndValues);
            
            
    }
    console.log(filtersAndValues);
    return(filtersAndValues)
   

}


export default getFilterFromUrl