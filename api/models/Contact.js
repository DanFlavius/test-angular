/**
 * Created by dcorde on 12.07.2016.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    bio: String,
    notes: [{
        title: String,
        date: Date
    }]
});

module.exports = mongoose.model('Contact', UserSchema);