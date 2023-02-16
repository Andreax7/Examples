const chai = require("chai")
const chaiHttp = require("chai-http")
const app  = require("../main.js")
const test = require('ava')
const api = require('../mainTest')
const expect = chai.expect

chai.use(chaiHttp)

//create genre
test('should create a new genre ', async t => {
    const { body } = await api.post('/genre')
    .set("authorization", "Basic test:test123")
    .send({
         genre_name: "genre"
    })
    t.assert(body,'genre created')
  })


// get all genres
test('should get all genres ', async t => {
    const { body } = await api.get('/genre')
    t.assert(body.length > 0, 'All genres fetched')
  })

   //delete genre

   test('should delete last genre by id ', async t => {
    const genreArr = await api.get('/genre').then(res=>res)
    let resp = genreArr._body
    const id = (resp[resp.length-1].id)
    const { body } = await api.delete(`/genre/${id}`)
    .set("authorization", "Basic test:test123")
    t.assert(body, 'genre deleted successfully')
  })

