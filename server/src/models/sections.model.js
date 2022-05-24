const mongoose = require('mongoose');
const { Schema } = mongoose;

const Quizzes = new Schema({ 
    question: String,
    answer: String, 
    
});
const Sections = mongoose.model('Sections', { 
    title: {type: String, required : true},
    description: String,
    content: String,
    resources: String,
    quizzes: [Quizzes],
    course: String,
});
module.exports = Sections

// Modules:
// Title
// Description
// Content
// Resources
// Quizz