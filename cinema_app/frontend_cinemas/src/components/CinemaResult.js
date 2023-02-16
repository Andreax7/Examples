import React , { useState, useEffect } from "react"
import '../styles/cinema.css'
import {useNavigate } from "react-router-dom";

export function CinemaResult({data, newCin, setNewCin}) {
  
  const userCoded = localStorage.getItem('Basic ')
  const head = "Basic " + userCoded
  let errMsg = ""
  const navigate = useNavigate();

  useEffect(()=>{

  },[newCin])


  async function removeCinema(id){

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

      await fetch("http://localhost:3001/cinema/" + id, requestOptions)
      .then(response => response.json())
      .then( res => {
          console.log('response ',res)
      }).catch(err => {
        errMsg = "wrong Cinema"
      })
      setNewCin({})
      //navigate("/user")
  }
      return (
        <div className="Cinemas">
                <h2>All Cinemas</h2>
                <div className="cinGrid">
                  <div className="cinemasRow">
                  {errMsg}
                    { data ? data.map( (cin) => 
                      <div className="detailBox" key={cin.id}> 
                                    <span> 
                                        <strong>ime:</strong> {cin.name} <br/> 
                                          <strong>lokacija: </strong> {cin.location} <br/>
                                              <strong>radni dan i vrijeme: </strong> {cin.openDays} {cin.openHours}
                                              <button value={cin.id} onClick={(e)=>removeCinema(e.target.value)}> Delete </button>
                                    </span>
                                    <hr/>
                        </div>) : <div> Loading data ...</div>}
                    </div>
                </div>
        </div>
      );
}