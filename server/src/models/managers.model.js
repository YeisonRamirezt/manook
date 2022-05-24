const mongoose = require('mongoose');
const Managers = mongoose.model('Managers', { 
    name: {type: String, required : true},
    lastname: String,
    permissions: String ,
    trainees: String,
});
module.exports = Managers

// Manager:
// Name
// Last Name
// Permission
// Trainees