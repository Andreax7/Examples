import React, { useState, useEffect } from "react"
import DropdownCategory from "../components/DropdownCategory"

export default function Projections() {
    const [category, setCategory] = useState({})
    const [cinemas, setCinema] = useState([])
    const [day, setDate] = useState("")
    const [allProj, setAll ] = useState([])
    const [erMsg, setMsg ] = useState([])

    useEffect(()=>{
      getAllProjections()
      getAllCinemas()
    }, [])


    const requestOptions = {
      method: "GET",
      headers: {  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json",
                "Accept": "application/json"
              },
  }

  async function getAllProjections(){ 
    let path = "http://localhost:3001/projection"
    await fetch(path, requestOptions)
          .then(resp => resp.json())
          .then( fitered => {
                setAll(fitered)
            })
            .catch(err => {

                console.log("Error Reading data " + err);
            })
}
async function getAllCinemas(){ 
  let path = "http://localhost:3001/cinema"
  await fetch(path, requestOptions)
        .then(resp => resp.json())
        .then( cin => {
              setCinema(cin)
          })
          .catch(err => {

              console.log("Error Reading data " + err);
          })
}

  async function filterByCategory(){ 
            let path = "http://localhost:3001/projection/category/"+ category
            await fetch(path, requestOptions)
                  .then(resp => resp.json())
                  .then( fitered => {
                        setAll(fitered)
                    })
                    .catch(err => {
                      setAll([])
                      setMsg("No movies in choosed category")
                        console.log("Error Reading data " + err);
                    })
    }
  async function filterByDate(){ 
      let path = "http://localhost:3001/projections/day/"+ day
      await fetch(path, requestOptions)
            .then(resp => resp.json())
            .then( filtered => {
              console.log('here ',filtered)
                  setAll(filtered)
              })
              .catch(err => {
                  setAll([])
                  setMsg("No projections on that day")
                  console.log("Error Reading data " + err);
              })
}


    return (
      <div className="Projections">
        <h2> Filter projections </h2>
        <div className="filterProjections">
            <div className="fItem">

              <span>Choose Category  </span>
                 <DropdownCategory onChange={setCategory}/>
                <button onClick={filterByCategory}> Search</button>
               
            </div>
            <div className="fItem2">
              <span> Choose date to see projection on the day: </span>
              <input type="date" id="day" value={day} onChange={(e) => setDate(e.target.value)}/>
              <button onClick={filterByDate}> Search</button>
            </div>      
        </div>

        <div className="proBox">
        
              {allProj.length > 0 ?
                  allProj.map((filtered) =>
                                  <div className="proItem" key={filtered.id}> 
                                  {cinemas.map((c)=> c.id === filtered.cinemaid ?  <p key={filtered.id}>kino: {c.name} </p>  : <></>) }
                                                <strong> Naslov: {filtered.title} </strong>
                                                <p> Trajanje: {filtered.duration} </p>
                                                <p> Datum i vrijeme početka: {filtered.day}  {filtered.time} </p><br/>
                                  </div>)
              : <h2> { erMsg }</h2>}
            </div>

      </div>
    )
}