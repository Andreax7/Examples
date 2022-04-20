require('dotenv').config()
const express = require("express");
const userModel = require("../User");
var cors = require('cors');
var jwt = require('jsonwebtoken');
var bcrypt = require("bcrypt");

var corsOptions = {
    origin: "*",
    methods:"GET",
    preflightContinue: false,
    optionsSuccessStatus: 200
  }

const router = express.Router();

router.post('/signup', async (req, res) =>{
    const { username, password, email, address, fistName, lastName, role } = req.body;
    try{
        const user = await userModel.create({
            username:req.body.username, 
            password:bcrypt.hashSync(req.body.password,12),
            email: req.body.email, 
            address: req.body.address, 
            fistName: req.body.firstName, 
            lastName: req.body.lastName, 
            role: req.body.role  
        });
        await user.save();
        res.status(201).json(user);
    }
    catch (err){
        console.log(err.message);
        res.status(400).send('something went wrong!');
    }

});

router.post('/login', async (req,res)=>{
    try {
        var user = await userModel.findOne({ username: req.body.username });
        if(!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
		else{ 
			var checkPass = bcrypt.compareSync(req.body.password, user.password);
			if(checkPass){
				const username  = req.body.username;
				const role = user.role;
				accessToken = jwt.sign({username, role}, process.env.secretCode);
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

module.exports = router;