const mongoose = require('mongoose');
const Admin = mongoose.model('Admin', { 
    name: {type: String, required : true},
    lastname: String,
    permissions: String,
});
module.exports = Admin

// Admin:
// Name
// Last Name
// Permission