import React, {useEffect, useState} from "react";


const DropdownCinema =({value, onChange}) =>{ 
  
  return( 
<select multiple={false} onChange={(val) =>{ onChange(val.target.value )}}>
    <option>Choose cinema</option> 
     { value.length > 0 ? value.map((v) => (   
                <option key={v.id} value={v.id}> {v.name} </option>
           
             )):  <option disabled>All</option> } </select>     
              ); 
    
};
  export default DropdownCinema;