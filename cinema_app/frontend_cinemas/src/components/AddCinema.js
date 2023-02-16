import React , { useState } from "react"

export function AddCinema({setNewCin}) {
  const [ errMessage, setErr ] = useState("")
  const [ name, setName ] = useState("")
  const [ location, setLoc ] = useState("")
  const [ openDays, setDays ] = useState("")
  const [ openHours, setHours ] = useState("")

  const userCoded = localStorage.getItem('Basic ')
  const head = "Basic " + userCoded 

  const addNew = async e => {
    e.preventDefault();
    const data = { "name":name ,"location":location, openDays:openDays, openHours:openHours };  
    const requestOptions = {
              method: "POST",
              headers: {  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        "Access-Control-Allow-Origin": "*",
                        "content-type": "application/json",
                        "Accept": "application/json",
                        "authorization": head
                      },
              body:JSON.stringify(data)
    }
      if(name === '' || location === '' || openDays === '' || openHours === '' ){
        setErr('Empty fields');
      }
      else{
          await fetch("http://localhost:3001/cinema", requestOptions)
            .then(response => response.json())
            .then( res => {
              console.log('response ',res)
              if(res.name === undefined ){  
                  setErr('Wrong credentials');
                }
              else{
               setNewCin(res)
              }
  
            })
       
      }

  }



      return (
        <div className="cinemaForm">
                <h2> Add new Cinema</h2>
        <form id="cinForm" onSubmit={addNew}>
          <div className="fItem">
              <span>Cinema Name</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/><br/>
          </div>
          <div className="fItem">
              <span>Location /City </span>
                <input type="text" value={location} onChange={(e) => setLoc(e.target.value)}/>
          </div>
          <div className="fItem">
              <span>days open: </span>
                <input type="text" value={openDays} onChange={(e) => setDays(e.target.value)}/>
          </div>
          <div className="fItem">
              <span> open time / from-to: </span>
                <input type="text" value={openHours} onChange={(e) => setHours(e.target.value)}/>
          </div>
                <button type="submit" value="newCinema" className="addNewBTN">add new</button>
         
          <h2 id="err">{errMessage}</h2>
        </form>
          
  
        </div>
      );
}
