import React , { useState, useEffect } from "react"
import DropdownCategory from "./DropdownCategory"
import DropdownCinema from "./DropdownCinema"


export function AddProjection({setNewProj, allCinemas}) {
  
  const [ errMessage, setErr ] = useState("")
  const [ categoryId, setCategory ] =useState()
  const [ cinemaid, setCinemaId ] = useState()
  const [ title, setTitle ] = useState("")
  const [ duration, setDuration ] = useState("")
  const [ day, setDay ] = useState("")
  const [ time, setTime ] = useState("")

  const userCoded = localStorage.getItem('Basic ')
  const head = "Basic " + userCoded

  const addNew = async e => {
    e.preventDefault();
    const data = { "cinemaid":cinemaid ,"category":categoryId, "title":title, "duration":duration, "day":day, "time":time };   
    
    const requestOptions = {
              method: "POST",
              headers: {  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        "Access-Control-Allow-Origin": "*",
                        "content-type": "application/json",
                        "Accept": "application/json",
                        "withCredentials":"true",
                        "authorization": head
                      },
              body:JSON.stringify(data)
    }
    console.log(data)
      if(cinemaid === undefined || categoryId === undefined || title === '' || duration === '' || day === '' || time === '' ){
        setErr('Empty fields');
      }
      else{
        await fetch("http://localhost:3001/projection", requestOptions)
        .then(response => response.json())
        .then( res => {
          console.log('response ',res)
          if(res.title === undefined ){  
              setErr('Wrong credentials');
            }
          else{
            setNewProj(res)
          }

        })
      }

  }

      return (
        <div className="projectionForm">
                <h2> Add new Projection</h2>
          
          <form id="projForm" onSubmit={addNew}>
          <div className="fItem">
              <span>Choose Cinema</span>
              <DropdownCinema value={allCinemas} onChange={setCinemaId}/>
               
          </div>
          <div className="fItem">
              <span>Category </span>
              <DropdownCategory onChange={setCategory}/>

          </div>
          <div className="fItem">
              <span>Title: </span>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div className="fItem">
              <span>duration: </span>
                <input type="text"  placeholder="_____ min" value={duration} onChange={(e) => setDuration(e.target.value)}/>
          </div>
          <div className="fItem2">
              <span>day: </span>
              <input type="date" id="myDate" value={day} onChange={(e) => setDay(e.target.value)}/>
  
                <span>time: </span>
                <input  type="time" value={time} onChange={(e) => setTime(e.target.value)}/>
          </div>
                <button type="submit" value="newCinema" className="addNewBTN2">add new</button>
         
          <h2 id="err">{errMessage}</h2>
        </form>
          
  
        </div>
      );
}

