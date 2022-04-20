require('dotenv').config()
const express = require("express");
const userModel = require("../Models/user");
const subjects = require("../Models/subject");
var jwt = require('jsonwebtoken');
var bcrypt = require("bcrypt");
var authenticateToken = require('./jwtmiddleware');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) =>{
    try{
        const user = await userModel.create({
            email: req.body.email, 
            password: bcrypt.hashSync(req.body.password,12),
            status: req.body.status, 
            role: req.body.role, 
        });
        await user.save();
        res.status(201).json(user);
    }
    catch (err){
        console.log(err.message);
        res.status(400).send('something went wrong!');
    }
});

authRouter.post('/login', async (req,res)=>{
    try {
        var user = await userModel.findOne({ email: req.body.email });
        if(!user) {
            return res.status(400).send({ message: "This user does not exist" });
        }
		else{ 
			var checkPass = bcrypt.compareSync(req.body.password, user.password);
			if(checkPass){
				const email  = req.body.email;
				const role = user.role;
                const id = user.id;
                const status = user.status;
				accessToken = jwt.sign({email, role, status, id}, process.env.secretCode);
				return res.status(200).send({"token":accessToken});
			}
			else{
				return res.status(400).send({"error":"password not matching"})
			}
		} 
	}
    catch (error) {
        res.status(500).send(error);
    }
});

authRouter.get('/subjects', async (request, response) => {
    var tokenValue = authenticateToken(request, response);
    if(tokenValue.role === "student" || tokenValue.role === "mentor"){
        try {  
        const subs = await subjects.find({});  
            response.json(subs);     
        } 
        catch (error) {
            response.status(500).send(error);
        }
    }
    else return response.status(403).send('Unauthorized');
});

module.exports = authRouter;