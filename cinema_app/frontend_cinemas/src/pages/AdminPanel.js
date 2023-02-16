import React, { useEffect, useState } from "react"
import "../styles/admin.css"
import { Auth } from "../auth/Auth"
import { AddProjection } from "../components/AddProjection"
import { AddCinema } from "../components/AddCinema"
import { ProjectionResult } from "../components/ProjectionResult"
import { CinemaResult } from "../components/CinemaResult"


export default function AdminPanel() {

  const [ allCinemas, setCins ] = useState([])
  const [ allProj, setProj ] = useState([])
  const [ newCin, setNewCin ] = useState()
  const [ newProj, setNewProj ] = useState()

  const auth = Auth();
  function logout(){
      auth.logout()
  }
  const requestOptions = {
    method: "GET",
    headers: {  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
              "Access-Control-Allow-Origin": "*",
              "content-type": "application/json",
              "Accept": "application/json"
            },
}
  async function getCin(){
    let path = "http://localhost:3001/cinema"
    const res = await fetch(path, requestOptions)
    const resp = await  res.json()
    setCins(resp)
  }

  async function getAllProj(){
    let path = "http://localhost:3001/projection"
    await fetch(path, requestOptions)
    .then(response => response.json())
    .then( resp => {
      setProj(resp)
    }).catch(err=>{
      console.log('err ', err)
    })
  }


  useEffect(()=>{
    getCin();
  },[newCin])
  
  useEffect(()=>{
    getAllProj()
  },[newProj])


    return (
      <div className="container">
          <div className="navAdmin">
              <h2 id="title"> Admin Panel </h2>
              <button id="logoutBTN" onClick={logout}>LOGOUT</button>
          </div>

          <div className="admin-grid">

              <div className="forms">
                        <div className="formBox1">
                          <AddProjection setNewProj={setNewProj} allCinemas={allCinemas}/>
                        </div>
                        <div className="formBox1">
                          <AddCinema setNewCin={setNewCin}/>
                        </div>
              </div> 

                  <div className="boxItems1">
                    {allCinemas && <CinemaResult data={allCinemas} newCin={newCin} setNewCin={setNewCin}/> }
                  </div>

              <div className="boxItems2">
                { allProj.length > 0 ? 
                             <ProjectionResult data={allProj} setNewProj={setNewProj} allCinemas={allCinemas}/>
               
              : <h2> No Projections</h2> }
             </div>
             </div>
             </div>

    )
  }
