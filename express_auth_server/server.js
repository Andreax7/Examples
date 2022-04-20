const express = require('express');
require('dotenv/config');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/userRoutes')
var app = express();



//MIDDLEWARE
var cors = require('cors');
const adminRouter = require('./routes/adminRoutes');
var corsOptions = {
    origin: "*",
    preflightContinue: false,
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions));
app.use(express.json());

//DATABASE CONNECTION
const url = 'mongodb://localhost:27017/Choc';

mongoose.connect( url, {useNewUrlParser:true})
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
  });
const database = mongoose.connection;
database.on('error', (error)=> console.log(error.message));
database.once('open', ()=> console.log('connected to db'));

// ROUTES
app.use("/",authRoutes);
app.use("/user",userRoutes);
app.use('/admin',adminRouter);


app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080")
  })


