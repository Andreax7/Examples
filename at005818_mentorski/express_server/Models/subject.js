const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    id:{ 
        type: Number, 
        unique: true
    },
    ime: {
        type: String,
        max:255,
        required: true,
    },
    kod: {
        type:String,
        max:16,
        unique: true
    },
    program: String,
    bodovi: Number,
    semestar_redovni: Number,
    semestar_izvanredni: Number,
    izborni: String
  });
  
const subject = mongoose.model('Subject', SubjectSchema);
module.exports = subject;