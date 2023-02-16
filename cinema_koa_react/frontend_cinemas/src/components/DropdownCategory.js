import React, {useEffect, useState} from "react";


const DropdownCategory =({onChange}) =>{

    const [ category, setCategories ] = useState([])
    const requestOptions = {
        method: "GET",
        headers: {  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                  "Access-Control-Allow-Origin": "*",
                  "content-type": "application/json",
                  "Accept": "application/json"
                },
    }
    async function LoadCategories(){ 
              let path = "http://localhost:3001/categories"
              await fetch(path, requestOptions)
                    .then(resp => resp.json())
                    .then( allCateg => {
                          setCategories(allCateg)
                      })
                      .catch(err => {
                          console.log("Error Reading data " + err);
                      })
      }
      useEffect(()=>{
        LoadCategories()
      },[])
      
  
  return( 
        <select multiple={false} onChange={(val) =>{ onChange(val.target.value )}}>
        <option value= "1">Choose category</option> 
                { category.length > 0 ? category.map((cat) => (    
                    <option key={cat.id} value={cat.id}> {cat.category} </option>
               )): <option disabled>loading..</option>
            
           }  </select>   
        ); 
    
};
  export default DropdownCategory;