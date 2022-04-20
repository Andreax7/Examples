// STUDENT ROUTES
const express = require("express");
var upisniList = require("../Models/enrollment");
var student = require("../Models/user");

var authenticateToken = require('./jwtmiddleware');
const studentRouter = express.Router();

var cors = require('cors');
var corsOptions = {
            preflightContinue: false,
            optionsSuccessStatus: 200
}


//GET ENROLLED SUBJECTS --Upisni list
studentRouter.get('/:id', async (request, response) => {
  try{ 
    var tokenValue = authenticateToken(request, response);
    var st = await student.findById(request.params.id);
    if(tokenValue.role == "mentor" || tokenValue.email == st.email){
      const enrolled = await upisniList.find({_id_usr:request.params.id});
      response.status(200).json(enrolled);    
    } 
  }
  catch (error) {
    response.status(500).send(error);
  }
  
});

//ENROLL TO SUBJECT (body contains data)
studentRouter.post('/:id', async (request, response) => {
  try {  
      const enrolled = await upisniList.exists({_id_usr:request.params.id, _id_sub:request.body._id_sub});
      if(!enrolled && request.body.status!=='passed'){
          const upisni = await upisniList.create({
            _id_usr: request.params.id,
            sub_status: request.body.sub_status, 
            _id_sub: request.body._id_sub
          });  
          response.status(201).json(upisni);     
      }
      else response.status(400).json('Already enrolled or passed');
  }  
      catch (error) {
        response.status(500).send(error);
      }
});

//Switch status to Passed - body contains subject data
studentRouter.put('/pass/:id', async (request, response) => {
 try {  
        var filter = {_id_usr:request.params.id, _id_sub:request.body._id_sub};
        const upisni = await upisniList.findOneAndUpdate(filter , {$set:{sub_status: request.body.sub_status}});  
        if(!upisni) return response.status(401).json('Not enrolled');
        await upisni.save();
        return response.status(201).json(filter);
    } 
      catch (error) {
        response.status(500).send(error);
      }
});


//Delete from enrollment -sends id of enrollment obj
studentRouter.delete('/remove/:id', async (request, response) => {
  try {  
      const enrolled = await upisniList.exists({_id_usr:request.params.id, _id_sub:request.body._id_sub});
      var tokenValue = authenticateToken(request, response);
      const usr = await student.find({email:tokenValue.email});
      console.log(enrolled._id);
      if( enrolled!=null && (usr[0].role == 'student' || usr[0].role == 'mentor')){
          await upisniList.findByIdAndRemove(enrolled).then();   
          response.status(201).json('OK');
        }
        else response.status(400).json('Subject does not exist');
    }  
      catch (error) {
        response.status(500).send(error);
      }
});


module.exports = studentRouter;