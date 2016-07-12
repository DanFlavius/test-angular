/**
 * Created by dcorde on 11.07.2016.
 */
"use strict";
var config = require('./config.js');
var request = require('request');
var querystring = require('querystring');
var createSendToken = require('./jwt.js');
var User = require('../models/User.js');
var jwt = require('jwt-simple');

module.exports = function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        token: req.body.token,
        client_id: req.body.clientId,
        client_secret: config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    request.post(accessTokenUrl, {json: true, form: params}, function(err, response, token){
        var accessToken = token.access_token;
        var headers = { Authorization: 'Bearer ' + accessToken };

        request.get({ url: peopleApiUrl, headers: headers, json: true}, function(err, response, profile){
            if (profile.error) {
                return res.status(500).send({message: profile.error.message});
            }

            if (req.header('Authorization')) {
                User.findOne({ google: profile.sub }, function(err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.google = profile.sub;
                        user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                        user.displayName = user.displayName || profile.name;
                        user.save(function() {
                          createSendToken(user);
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({ google: profile.sub }, function(err, existingUser) {
                    if (existingUser) {
                       return createSendToken(existingUser);
                    }
                    var user = new User();
                    user.google = profile.sub;
                    user.displayName = profile.name;
                    user.save(function(err) {
                        createSendToken(user);
                    });
                });
            }

        })
    })
};