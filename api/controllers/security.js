/**
 * Created by Alibek on 06.03.2016.
 */

var tokenRepo = require('../dataLayer/tokenRepo');
var userRepo = require('../dataLayer/userRepo');
var moment = require('moment');

module.exports = [
    {
        name: 'login',
        callback: function (payload, done) {
            userRepo.login(payload.userName, payload.pwd, function (err, user) {
                if (err) return done(err);
                if (user) {
                    require('crypto').randomBytes(48, function (ex, buf) {
                        var generatedToken = buf.toString('hex');
                        tokenRepo.add({
                            user: user._id,
                            validThru: payload.rememberMe ? moment().add(10080, "M").toDate() : moment().add(40, "m").toDate(),
                            isPermanent: payload.rememberMe,
                            token: generatedToken
                        }, function (err, data) {
                            if (err) return done(err);
                            if (data.ops[0] && data.ops[0].token)
                                done(null, {token: data.ops[0].token, user: user});
                            else
                                done("token not added");
                        });
                        //tokenRepo.closeUserTokens(result._id, function () {
                        //
                        //});
                    });
                }
                else {
                    done('#userAuthError');
                }
            });
        },
        allowAnonymous: true
    },{
        name: 'getusers',
        callback: function (payload, done) {
            userRepo.getusers(function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getuser',
        callback: function (payload, done) {
            userRepo.getOneById(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'adduser',
        callback: function (payload, done) {
            userRepo.add(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'updateuser',
        callback: function (payload, done) {
            userRepo.update(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'deleteuser',
        callback: function (payload, done) {
            userRepo.delete(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }, {
        name: 'searchusers',
        callback: function (payload, done) {
            userRepo.searchusers(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }
];





