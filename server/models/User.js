var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String
})

var User = mongoose.model('user', userSchema);

module.exports = User;