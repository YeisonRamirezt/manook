const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizzOptions = new Schema({ 
    optionOrder : Number,
    content: String,
    answer : Boolean,

});
const Quizzes = new Schema({ 
    question: String,
    options: [quizzOptions],
    
});

const Resources = new Schema({
    title : String,
    description: String,
    downlaodable : Boolean,
    fileUpload : String,
});
const Sections = new Schema({ 
    title: {type: String, required : true},
    description: String,
    content: String,
    resources: [Resources],
    hasVideo: Boolean,
    mainVideo : String,
    quizzes: [Quizzes],
});

const Modules = new Schema({ 
    name: {type: String, required : true},
    description: String,
    sections: [Sections],
});

const Courses = mongoose.model('Courses', { 
    name: {type: String, required : true},
    image: String,
    description: String ,
    modules: [Modules],
    created : { type: Date, default: Date.now },
});

module.exports = Courses

// Database Structure

// Trainee:

// Name
// Last Name
// Email
// Manager
// Position in company
// Start date
// Permissions
// Enrolled Courses
// Process


// Manager:
// Name
// Last Name
// Permission
// Trainees

// Admin:
// Name
// Last Name
// Permission


// Course:
// Name
// Image
// Description
// Modules

// Modules:
// Title
// Description
// Content
// Resources
// Quizz

// Quizzes:
// Question
// Answer
// Module
// Course



// Process (trainee & curse relationship):
// Completed module
// Completed Quiz
// Quiz score
// Course percentage (advancement)


/*
SAMPLE DATA

Manook Course

https://w7.pngwing.com/pngs/797/100/png-transparent-course-training-class-professional-certification-education-courses-miscellaneous-angle-business-thumbnail.png

Monook courde description goes here, This description is meant to be short so it can be displayed briefly

Manook module 1

This is a brief description for module 1

Manook section 1

This is a brief description for section 1

This is the content

Links go here or shit like that 

What would be the question here?

1

Option 1

2

Option 2

True


*/