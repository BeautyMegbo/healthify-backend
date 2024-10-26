const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  // Additional user fields can be added here
});

module.exports = mongoose.model('User', UserSchema);
