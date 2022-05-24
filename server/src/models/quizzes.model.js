const mongoose = require('mongoose');
const Quizzes = mongoose.model('Quizzes', { 
    questions: {type: String, required : true},
    answers: String,
    quizzmodule: String,
    course: String,
});
module.exports = Quizzes

// Quizzes:
// Question
// Answer
// Module
// Course