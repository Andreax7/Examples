import React , { useState, useEffect } from "react"
import '../styles/cinema.css'

export default function Cinemas() {
  const [ allCinema, setCinemas ] = useState([])
  const [ proj, setProj ] = useState([])
  const [selected, setSelect] = useState()

  const requestOptions = {
    method: "GET",
    headers: {  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
              "Access-Control-Allow-Origin": "*",
              "content-type": "application/json",
              "Accept": "application/json"
            },
}

  async function LoadCinemas(){ 
          let path = "http://localhost:3001/cinema"
          await fetch(path, requestOptions)
                .then(resp => resp.json())
                .then( allCinemas => {
                      setCinemas(allCinemas)
                  })
                  .catch(err => {
                      console.log("Error Reading data " + err);
                  })
  }

  async function GetCinProjections(id){
      let path = "http://localhost:3001/cinema/"+ id +"/projection"
      await fetch(path, requestOptions)
        .then(resp => resp.json())
        .then( allProj => {
          console.log('Proj ', allProj)
              setProj(allProj)
          })
          .catch(err => {
            setProj([])
              console.log("Error Reading data " + err);
          })
  }
  function SeeProjections(id){
    let choosen = allCinema.find( el => el.id === id)
    setSelect(choosen)
    GetCinProjections(id)
  }

  useEffect(()=>{
    LoadCinemas()
  },[])        
  


    return (
      <div className="cinemaBox">
        <h2> Cinemas </h2>
          <div className="filterCinema">
                <p> Click on LOAD to see projections of cinema </p>
          </div>
        <div className="cinGrid">
          <div className="cinemasRow">
          { allCinema && allCinema.map((cin) => (
                        <div className="detailBox" key={cin.id}> 
                                <div value={cin.id} >
                                    <span> 
                                        <strong>ime:</strong> {cin.name} <br/> 
                                        <strong>lokacija: </strong> {cin.location} <br/>
                                            <strong>radni dan i vrijeme: </strong> {cin.openDays} {cin.openHours}
                                            <button className="loadBtn" onClick={()=>SeeProjections(cin.id)}>
                                                    load...
                                            </button>  
                                    </span>
                                    <hr/>
                                </div>
                        </div>
                    )) }
         
          </div>

          <div className="projRow">
            <div>
            <p> Projections of Cinema </p>
            <div className="ProGrid">
                  <div className="proBox">
                    { proj.length > 0 ? proj.map( (projection) => 
                      <div className="proBox" key={projection.id}> 
                                    <span> 
                                        <strong>naslov:</strong> {projection.title} <br/> 
                                       {allCinema.map((c)=> c.id === projection.cinemaid ?  <strong>kino: {c.name} </strong>  : <> </>) } <br/>
                                        <strong>trajanje: </strong> {projection.duration} <br/>
                                              <strong>dan i vrijeme: </strong> {projection.day} {projection.time}
                                    </span>
                        
                        </div>) : <div> No projections / {selected ? selected.name : <></>} </div>}
                    </div>
                </div>
  
            </div>
          </div>
        </div>
      </div>
    )
}