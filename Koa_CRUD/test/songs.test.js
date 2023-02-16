const chai = require("chai")
const chaiHttp = require("chai-http")
const app  = require("../main.js")
const test = require('ava')
const api = require('../mainTest')
const expect = chai.expect

chai.use(chaiHttp)

//create song
test('should create a new song by author in id ', async t => {
   // const authorsList = await api.get('/autors')
    const autorId = 7 //authorsList.length-1
    const { body } = await api.post(`/songs/autors/${autorId}`)
    .set("authorization", "Basic korisnik:korisnik123")
    .send({
         title: "Cenotes", len:7.36, genres:1
    })
    t.assert(body,'song created')
  })


// get all songs
test('should get all songs ', async t => {
    const { body } = await api.get('/songs')
    t.assert(body.length > 0, 'All songs fetched')
  })

  //get one song
  test('should get one song by id ', async t => {
    const sList = await api.get('/songs').then(res=>res)
    const id = 4 //sList.length-1
    const { body } = await api.get(`/songs/${id}`)
    t.assert(body, 'One song fetched')
  })


   //delete song

   test('should delete last song by id ', async t => {
    const songArr = await api.get('/songs').then(res=>res)
    let resp = songArr._body
    const id = (resp[resp.length-1].id)
    const { body } = await api.delete(`/songs/${id}`)
    .set("authorization", "Basic test:test123")
    t.assert(body, 'Song deleted successfully')
  })


// get song with genre

test('should get one song by genre id ', async t => {
    const gList = await api.get('/genre').then( res=> res)
    const id = 4 //gList.length-1
    const { body } = await api.get(`/songs/genre/${id}`)
    t.assert( body, 'Song fetched')
  })

