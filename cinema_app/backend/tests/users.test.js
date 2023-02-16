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


//get list of cinemas 

test('should get all cinemas ', async t => {
    const { body } = await api.get('/cinema')
    .set("content-type", "application/json")
    t.assert(body.length >= 0)
})

//get list of projections 

test('should get all projections ', async t => {
    const { body } = await api.get('/projection')
    .set("content-type", "application/json")
    t.assert(body.length >= 0)
})

test('should get all categories ', async t => {
    const { body } = await api.get('/categories')
    .set("content-type", "application/json")
    t.assert(body)
})
/*
describe("get/cinemas", () => {
    it("should give all the cinemas", done => {
        chai.request('http://localhost:3001')
            .get("/cinema")
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    })
});

//get list of all projections 
describe("get/projections", () => {
    it("should give all the projections", done => {
        chai.request('http://localhost:3001')
            .get("/projection")
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    })
});


//get list of all categories 
describe("get/categories", () => {
    it("should give all the categories", done => {
        chai.request('http://localhost:3001')
            .get("/categories")
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    })
});

//list - projections of cinema 
describe("get/projections/of/cinema/:idCinema", () => {
    it("should give all the projections in one cinema/ or error", done => {
        chai.request('http://localhost:3001')
            .get("/cinema/projection/12")
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*")
            .end((err, res) => {
                console.log('eerr ',err)
                expect(res).to.have.status(500); // no cinema projections /empty db projection table
                done();
            });
    })
});


//get one projection
describe("get one projection (passing id)", () => {
    it("should give details of second projection(first vas previously deleted", done => {
        chai.request("http://localhost:3001")
            .get("/projection/2")
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*")
            .end((res) => {
                expect(res).to.have.status(200);
                done();
            });
    })
});*/