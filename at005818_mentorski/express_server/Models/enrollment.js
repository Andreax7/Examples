const mongoose = require('mongoose');

const EnrollSchema = new mongoose.Schema({
    _id_enr: mongoose.Schema.Types.ObjectId,
    sub_status: {
        type: String,
        max:64
    },
    _id_usr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    _id_sub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }

  });

const enrollment = mongoose.model('Enrollment', EnrollSchema);
module.exports = enrollment;