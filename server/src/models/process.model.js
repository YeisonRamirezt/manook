const mongoose = require('mongoose');
const { Schema } = mongoose;

const Quizzes = new Schema({
    quizzId : String,
    score : Number,
    percentage : Number,
    completed : Boolean,
});

const Sections = new Schema({
    sectionId : String,
    score : Number,
    percentage : Number,
    completed : Boolean,
    quizzes:[Quizzes],
});

const Modules = new Schema({
    moduleId : String,
    score : Number,
    percentage : Number,
    completed : Boolean,
    sections:[Sections],
});

const Courses = new Schema({
    courseId : String,
    score : Number,
    percentage : Number,
    completed : Boolean,
    modules:[Modules],
});

const Process = mongoose.model('Process', { 
    createdDate : {type: Date, default: Date.now},
    repId : String,
    courses : [Courses],
});

module.exports = Process;