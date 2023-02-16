const chai = require("chai")
const chaiHttp = require("chai-http")
const app  = require("../main.js")
const test = require('ava')
const api = require('../mainTest')
const expect = chai.expect

chai.use(chaiHttp)

//create autor
test('should create a new author ', async t => {
    const { body } = await api.post('/autors')
    .set("authorization", "Basic korisnik:korisnik123")
    .send({
      name:" Band"
    })
    t.assert(body.rowCount === 1,'author created')
  })


// get all autors
test('should get all autors ', async t => {
    const { body } = await api.get('/autors')
    t.assert(body.length > 0, 'authors fetched')
  })

  //get one autor
  test('should get one autor by id ', async t => {
    const id = 7
    const { body } = await api.get(`/autors/${id}`)
    t.assert(body.id, 'author fetched')
  })

