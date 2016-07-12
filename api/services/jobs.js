/**
 * Created by dcorde on 28.06.2016.
 */
var jwt = require('jwt-simple');
var User = require('../models/User.js');
var createSendToken = require('./jwt.js');

module.exports = function (req, res) {

    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized'
        });
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "shhh..");

    if (!payload.sub) {
        res.status(401).send({
            message: 'Authorization failed!'
        });
    }

    var searchUser = {
        email: 'dan.corde@yahoo.ro'
    };

    User.findOne(searchUser, function (err, user) {
        if (err) return err;

        createSendToken(user, res);
    });
};

