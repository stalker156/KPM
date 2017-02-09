var tokenRepo = require('../dataLayer/tokenRepo');
var userRepo = require('../dataLayer/userRepo');
var moment = require('moment');
var _ = require('underscore');

module.exports = function (io, routes) {
    io.sockets.setMaxListeners(15);
    
    io.sockets.on('connection', function (socket) {

        _.each(routes, function (route) {
            socket.on(route.name, function (payload, callback) {
                if (socket.request._query.token) {
                    valid(socket.request._query.token, function (err, result, user) {
                        if (err) {
                            console.error('validate token error: ' + err);
                            socket.emit('unauthorized');
                        }
                        if (result === true) {
                            payload.user = user;
                            route.callback(payload, callback);
                        }
                        else {
                            if (route.allowAnonymous) {
                                socket.emit('token_expired');
                                route.callback(payload, callback);
                            }
                            else {
                                console.log(route.name,socket.request._query.token, ' unauthorized 1');
                                socket.emit('unauthorized');
                            }
                        }
                    });


                }
                else {
                    if (route.allowAnonymous) {
                        route.callback(payload, callback);
                    }
                    else {
                        console.log("unauthorized 2");
                        socket.emit('unauthorized');
                    }
                }
            });
        });

    });


}




function valid(token, done) {
    console.log("check if token valid");
    tokenRepo.getByToken(token, function (err, data) {
        if (err) {
            return done(err);
        }
        if (data) {
            if (data.validThru > moment().toDate()) {
                userRepo.get(data.user, function (err, user) {
                    if (err) return done(err);
                    if (!user) {
                        return done("user not found");
                    }
                    else {
                        done(null, true, user);
                        tokenRepo.updateValidThru(data, function () {
                        });
                    }
                });
            }
            else {
                done(null, false);
            }
        }
        else {
            done(null, false);
        }

    });
}