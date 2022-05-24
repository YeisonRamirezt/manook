const mongoose = require('mongoose');
const Trainee = mongoose.model('Trainees', { 
    name: String,
    email: String,
    manager : String,
    position: String,
    startdate: Date,
    permissions : String,
    enrolledcourses : String,
    process: String
});
module.exports = Trainee;

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