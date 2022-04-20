const express = require("express");
require('dotenv/config');
const mentorRouter = express.Router();

var authenticateToken = require('./jwtmiddleware');

const SubjectModel = require('../Models/subject');
const UserModel = require('../Models/user');
var upisniList = require("../Models/enrollment");


//Add new subject
mentorRouter.post("/new_sub", async (request, response) => { 
    try {
        var tokenValue = authenticateToken(request, response);
        if(tokenValue.role === "mentor"){
            const subject = await SubjectModel.create({
                id: request.body.id,
                ime: request.body.ime,
                program: request.body.program,
                kod: request.body.kod,
                bodovi: request.body.bodovi,
                semestar_redovni: request.body.semestar_redovni,
                semestar_izvanredni: request.body.semestar_izvanredni,
                izborni: request.body.izborni
            });
            subject.save();
            return response.status(201).send(subject);
        }
        else return response.status(403).send('Unauthorized');
    }
    catch (err){
        response.status(400).send('something went wrong!');
    }
});

//Update existing subject
mentorRouter.post("/:id", async (request, response) => { 
    try {
        const doc = await SubjectModel.findOne({ _id: request.params.id});
        if(!doc) return response.status(400).send('Error');
        else{
            var tokenValue = authenticateToken(request, response);
            if(tokenValue.role === "mentor"){
                const subject = await SubjectModel.updateOne({ _id: request.params.id},{
                    id: request.body.id,
                    ime: request.body.ime,
                    program: request.body.program,
                    kod: request.body.kod,
                    bodovi: request.body.bodovi,
                    semestar_redovni: request.body.semestar_redovni,
                    semestar_izvanredni: request.body.semestar_izvanredni,
                    izborni: request.body.izborni
                });
                return response.status(201).send(subject);
            }
            else return response.status(403).send('Unauthorized');
        }
    }
    catch (err){
        console.log(err.message);
        response.status(400).send('something went wrong!');
    }
});

//Returns a list of students
mentorRouter.get("/students", async (request, response) => { 
    try {
        var tokenValue = authenticateToken(request, response);
        if(tokenValue.role === "mentor"){
            const students = await UserModel.find({'role':"student"});
            return response.status(201).send(students);
        }
        else return response.status(403).send('Unauthorized');
    }
    catch (err){
        console.log(err.message);
        response.status(400).send('something went wrong!');
    }
});

mentorRouter.get('/sub/:id', async (request, response) => {
    try { 
        var tokenValue = authenticateToken(request, response);
        var subject = await SubjectModel.find({'_id':request.params.id});
        if(tokenValue.role == "mentor"){
            response.status(200).json(subject);     
        }
    }
    catch (error) {
       response.status(404).send(error);
    }
  });

  mentorRouter.get('/students/:id', async (request, response) => {
    try { 
        var tokenValue = authenticateToken(request, response);
        var st = await UserModel.find({'_id':request.params.id});
        if(tokenValue.role == "mentor" || tokenValue.email == st.email){
            const enrolled = await upisniList.find({_id_usr:request.params.id});
            response.status(200).json(enrolled);     
        }
    }
    catch (error) {
       response.status(404).send(error);
    }
   
  });



module.exports = mentorRouter;