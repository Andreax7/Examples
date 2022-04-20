const express = require("express");
require('dotenv/config');
const adminRouter = express.Router();

var authenticateToken = require('./jwt_middleware');

const ProductModel = require('../product');
const ProducerModel = require('../producer');


adminRouter.post("/new_producer", authenticateToken, async (request, response) => { 
    try {
        if(request.token.role === "admin"){
            const producer = await ProducerModel.create({
                company: request.body.company,
                country: request.body.country,
                logo: request.body.logo,
                description: request.body.description,
                email: request.body.email
            });
            producer.save( );
            response.status(201);
            response.send(producer);
        }
        else return response.status(403).send('Unauthorized');
    }
    catch (err){
        console.log(err.message);
        response.status(400).send('something went wrong!');
    }
});


adminRouter.post("/new_product", authenticateToken, async (request, response) => { 
    try {
        if(request.token.role === "admin"){
            const prod = request.body;
            const product = await ProductModel.create(prod);
            await product.save();
            response.status(201).json(product);
            response.status(200);
        }
        else return response.status(403).send('Unauthorized');
    }
    catch (err){
        console.log(err);
        response.status(400).send('something went wrong!');
    }
  });


module.exports = adminRouter;