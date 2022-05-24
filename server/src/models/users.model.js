const mongoose = require("mongoose");
const Users = mongoose.model("Users", {
  creationDate: { type: Date, default: Date.now },
  name: String,
  lastName: String,
  email: String,
  password: String,
  userType: String,
  settings: String,
});
module.exports = Users;
