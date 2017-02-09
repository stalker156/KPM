/**
 * Created by madina on 03.02.2017.
 */
var deviceServiceRepo = require('../dataLayer/deviceServiceRepo');

module.exports = [
    {
        name: 'getdeviceservices',
        callback: function (payload, done) {
            deviceServiceRepo.getdeviceservices(function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getdeviceservice',
        callback: function (payload, done) {
            deviceServiceRepo.getOneById(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'adddeviceservice',
        callback: function (payload, done) {
            deviceServiceRepo.add(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'updatedeviceservice',
        callback: function (payload, done) {
            deviceServiceRepo.update(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'deletedeviceservice',
        callback: function (payload, done) {
            deviceServiceRepo.delete(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }, {
        name: 'searchdeviceservices',
        callback: function (payload, done) {
            deviceServiceRepo.searchdeviceservices(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }
];