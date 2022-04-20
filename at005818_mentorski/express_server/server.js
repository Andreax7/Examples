const express = require('express');
require('dotenv/config');
const mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var authRoutes = require('./Routes/auth');
var studentRoutes = require('./Routes/student')
var mentorRoutes = require('./Routes/mentor');


//MIDDLEWARE
var cors = require('cors');
var corsOptions = {
    origin: "*",
    preflightContinue: false,
    optionsSuccessStatus: 200
  }

//DATABASE CONNECTION
const url = 'mongodb://localhost:27017/EnrollSystem';
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

app.use(cors(corsOptions));
app.use(express.json());
// ROUTES
app.use("/",authRoutes);
app.use("/student",studentRoutes);
app.use('/mentor',mentorRoutes);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080");
  })