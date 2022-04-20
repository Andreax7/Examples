const express = require("express");
require('dotenv/config');
const userRoutes = express.Router();
var authenticateToken = require('./jwt_middleware');
const product = require('../product');
const producer = require("../producer");


userRoutes.get("/products", authenticateToken, async (request, response) => { 
  try {
      
      if(request.token.role === "user" || request.token.role === "admin"){
          return response.send('Products');
          //send all products
      }
      else return response.status(403).send('Unauthorized');
  } 
  catch (error) {
    response.status(500).send(error);
  }
});

userRoutes.get("/producers", authenticateToken, async (request, response) => { 
  try {
      if(request.token.role === "user" || request.token.role === "admin"){
        var allProducers = await producer.find();
          return response.json(allProducers); //send all products
          
      }
      else return response.status(403).send('Unauthorized');
  } 
  catch (error) {
    response.status(500).send(error);
  }
});

userRoutes.get("/product/:productId", authenticateToken, async (request, response) => { 
  try {
      if(request.token.role === "user" || request.token.role === "admin"){
          return response.send('Product details');
          //send all products
      }
      else return response.status(403).send('Unauthorized');
  } 
  catch (error) {
    response.status(500).send(error);
  }
});


  module.exports = userRoutes;