/**
 * Created by madina on 02.02.2017.
 */
var deviceRepo = require('../dataLayer/deviceRepo');

module.exports = [
    {
        name: 'getdevices',
        callback: function (payload, done) {
            deviceRepo.getdevices(function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getdevice',
        callback: function (payload, done) {
            deviceRepo.getOneById(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'adddevice',
        callback: function (payload, done) {
            deviceRepo.add(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'updatedevice',
        callback: function (payload, done) {
            deviceRepo.update(payload, function (err, data) {
            if (err) return done(err);
            done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'deletedevice',
        callback: function (payload, done) {
            deviceRepo.delete(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }, {
        name: 'searchdevices',
        callback: function (payload, done) {
            deviceRepo.searchdevices(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }
];
