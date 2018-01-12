var users = require('../models/users');
var jwt = require('jwt-simple');
var config = require('../config');

module.exports = function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json('Missing credentials');
    } else {
        users.findOne({ username: req.body.username }).then(function(user) {
            var expTime = +config.expiration_date;
            if (user) {
                user.comparePassword(req.body.password, function(err, result) {
                    if (result && !err) {
                        var token = jwt.encode({exp: Math.round(expTime), username: user.username}, config.secretKey);
                        res.json({
                            user: {
                                username: user.username,
                                _id: user._id,
                                token: token
                            }
                        });
                    } else {
                        res.status(404).json({msg: 'Invalid username or password'});
                    }
                });

            } else {
                users.create(req.body).then(function(user) {
                    var token = jwt.encode({exp: Math.round(expTime), username: user.username}, config.secretKey);
                    res.json({
                        user: {
                            username: user.username,
                            _id: user._id,
                            token: token
                        }
                    });
                }).catch(function(e) {
                    console.log(e);
                })
            }
        }).catch(function(e) {
            console.log(e);
        })
    }
};