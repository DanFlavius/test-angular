/**
 * Created by dcorde on 24.06.2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var Contact =  require('./models/Contact.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('./services/localStrategy.js');
var createSendToken = require('./services/jwt.js');
var jobs = require('./services/jobs');
var facebookAuth = require('./services/facebookAuth.js');
var googleAuth = require('./services/googleAuth.js');
var contact = require('./services/contact.js');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');

    next();
});

passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);

app.post('/register', passport.authenticate('local-register'), function (req, res) {
    createSendToken(req.user, res);
});

app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createSendToken(req.user, res);
});

app.get('/jobs', jobs);

app.get('/contact', contact);

app.post('/auth/google', googleAuth);

app.post('/auth/facebook', facebookAuth);

mongoose.connect('mongodb://localhost/psjwt');

var server = app.listen(3000, function () {
    console.log('api listening on', server.address().port)
});