/**
 * Created by dcorde on 28.06.2016.
 */
var config = require('../services/config.js');

exports.send = function(email){
    var payload = {
        sub: email
    };
    var token = jwt.encode(payload, config.EMAIL_SECRET);
};