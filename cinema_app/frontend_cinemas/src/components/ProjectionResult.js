import React , { useState, useEffect } from "react"

export function ProjectionResult({data, setNewProj, allCinemas}) {
  
  const userCoded = localStorage.getItem('Basic ')
  const head = "Basic " + userCoded
  let errMsg = ""

  async function removeProjection(id){
    console.log(id)
    const requestOptions = {
      method: "DELETE",
      headers: {  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json",
                "Accept": "application/json",
                "withCredentials":"true",
                "authorization": head
              }
      }

      await fetch("http://localhost:3001/projection/" + id, requestOptions)
      .then(response => response.json())
      .then( res => {
        console.log('response ',res)
        setNewProj({})
      })
      .catch(err => {
        errMsg = "wrong Movie"
    })

  }
      return (
        <div className="Projections">
                <h2>All Projections</h2>
                <div className="ProGrid">
                  <div className="proBox">
                  { errMsg ?  <h3>errMsg</h3> : <></>}
                    { data ? data.map( (projection) => 
                      <div className="proBox" key={projection.id}> 
                                    <span key={projection.title}> 
                                        <strong>naslov:</strong> {projection.title} <br/> 
                                       {allCinemas.map((c)=> c.id === projection.cinemaid ?  <strong key={c.name}>kino: {c.name} </strong>  : <p key={c.name}></p>) } <br/>
                                        <strong>trajanje: </strong> {projection.duration} <br/>
                                        <strong>dan i vrijeme: </strong> {projection.day} {projection.time}
                                        <button value={projection.id} onClick={(e)=>removeProjection(e.target.value)}> Delete </button>
                                    </span>
                        
                        </div>) : <div key="key"> Loading data ...</div>}
                    </div>
                </div>
        </div>
      );
}