
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Modules = mongoose.model('Modules', { 
    name: {type: String, required : true},
    description: String,
    sections: String,
    course: String,
});
module.exports = Modules

// Modules:
// Title
// Description
// Content
// Resources
// Quizz