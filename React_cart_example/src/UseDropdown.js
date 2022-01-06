import React, {useState} from "react";


const UseDropdown =({data ,onChange}) =>{
    
  const [ tea, setValue] = useState([""]);
  
  return(
            <select multiple={false} onChange={(val) =>{ setValue(val.target.value); onChange(val.target.value )}} value={tea.prop}>
                <option disabled>All</option>
                {data.map((caj) => ( 
                    <option key={caj} value={caj}> {caj} </option>
                )) } 
            </select>   
              
                ); 
     
};
  export default UseDropdown;