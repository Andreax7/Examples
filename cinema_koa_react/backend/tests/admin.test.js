const test = require('ava')

const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
const base64url = require('base64url')
const api = require('../mainTest.js')

chai.use(chaiHttp)

/*****************************************************************************
* **************************
* Prije pokretanja testova -postaviti za delete admin i cinema id u pathu +1
* ************************  (Pogledat u bazi vrijednosti)
*****************************************************************************/


//create admin
test('should create a new admin ', async t => {
    const { body } = await api.post('/signup')
    .set("content-type", "application/json")
    .send({ name: "NoviPrimj123", password:"mojPassd123"})
    t.assert(body.rowCount === 1,'admin created')
})

const eUser = "NoviPrimj123:mojPassd123"
const encodedString = base64url.encode(eUser)

//test user login
test(' login user ', async t => {
    const { body } = await api.post('/login')
    .set("content-type", "application/json")
    .set("authorization", "Basic " + encodedString)
    .send({ "name": "NoviPrimj123", "password":"mojPassd123"})
    t.assert(body,'admin created')
})

//test add new cinema
test(' post/new cinema ', async t => {
    const { body } = await api.post("/cinema")
    .set("content-type", "application/json")
    .set("authorization", "Basic " + encodedString)
    .send({"name":"Kazalište","location":"Split","openDays":"Pon-Pet","openHours":"09-18"})
    t.assert(body.name === "Kazalište")
})
/*
//test add new cinema 2
test(' post/new cinema 2 ', async t => {
    const { body } = await api.post("/cinema")
    .set("content-type", "application/json")
    .set("authorization", "Basic " + encodedString)
    .send({"name":"Kino Karaman","location":"Split","openDays":"Monday-Friday","openHours":"16-23"})
    t.assert(body.name === "Kino Karaman")
})
*/

//test update cinema
test(' update exsisting cinema ', async t => {
     let cId = 1
    const { body } = await api.put("/cinema/"+ cId)
    .set("content-type", "application/json")
    .set("authorization", "Basic " + encodedString)
    .send({"name":"Kazalište","location":"Zagreb","openDays":"Pon-Pet","openHours":"10-20"})
    t.assert(body)
})

//test add new projection
test(' post/new projection ', async t => {
    const { body } = await api.post("/projection")
    .set("content-type", "application/json")
    .set("authorization", "Basic " + encodedString)
    .send({"cinemaid":"2", "category":"6", "title": "The Immitation Game","duration": "115 min", "day": "2023-03-10",
    "time": "18:15:00"})
    t.assert(body)
})

//test update projection
test(' update projection ', async t => {
    let projId = 1
    const { body } = await api.put("/projection/" + projId)
    .set("content-type", "application/json")
    .set("authorization", "Basic " + encodedString)
    .send({"cinemaid":"2", "category":"6", "title": "The Immitation Game","duration": "115 min", "day": "2023-05-10",
    time: "17:15:00"})
    t.assert(body)
})


test(' delete projection ', async t => {
    var projId = 1                        //change when testing
    const { body } = await api.delete(`/projection/${projId}`)
    .set("content-type", "application/json")
    .set("authorization", "Basic " + encodedString)
    t.assert(body)
})


//test cinema delete
test(' delete cinema ', async t => {
    const cinemaId = 1                       //change when testing
    const { body } = await api.delete(`/cinema/${cinemaId}`)
    .set("content-type", "application/json")
    .set("authorization", "Basic " + encodedString)
    t.assert(body )
})


//test user delete
test(' delete admin ', async t => {
    const adminId = 1                    //change when testing
    const { body } = await api.delete(`/auth/${adminId}`)
    .set("content-type", "application/json")
    .set("authorization", "Basic " + encodedString)
    t.assert(body)
})
/*

//example2
describe("post/new projection2", () => {
    it("should add new projection2 ", done => {
        chai.request('http://localhost:3001')
            .post("/projection")
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*")
            .set("withCredentials","true")
            .set("authorization", "Basic "+ encodedString)
            .send({cinemaid:5, category:2, title: "Matrix ",duration: "135 min", day: "2023-03-15",
            time: "19:15:00"})
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    })
});

//Update Projection
describe("post/update projection2", () => {
    it("should update projection2 ", done => {
        var id = "2"
        chai.request('http://localhost:3001')
            .post("/projection/"+id)
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*")
            .set("withCredentials","true")
            .set("authorization", "Basic "+ encodedString)
            .send({cinemaid:5, category:4, title: "Matrix ",duration: "135 min", day: "2023-03-18",
            time: "19:00:00"})
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    })
});

//delete one cinema

describe("delete/cinema", () => {
    it("should delete one chosen cinema", done => {
        var id = "12"
        chai.request('http://localhost:3001')
            .delete("/cinema/"+id)
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*")
            .set("withCredentials","true")
            .set("authorization", "Basic "+ encodedString)
            .end((res) => {
                expect(res).to.have.status(200); // if exists in db (500 if not)
                done();
            });
    })
});

//delete one projection

describe("delete/projection", () => {
    var id = "1"
    it("should delete one chosen projection", done => {
        chai.request('http://localhost:3001')
            .delete("/projection/"+id)
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*")
            .set("withCredentials","true")
            .set("authorization", "Basic "+ encodedString)
            .end((res) => {
                expect(res).to.have.status(500); // if exists in db (500 if not)
                done();
            });
    })
});

*/
