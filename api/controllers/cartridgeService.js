/**
 * Created by madina on 03.02.2017.
 */
var cartridgeServiceRepo = require('../dataLayer/cartridgeServiceRepo');

module.exports = [
    {
        name: 'getcartridgeservices',
        callback: function (payload, done) {
            cartridgeServiceRepo.getcartridgeservices(function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getcartridgeservice',
        callback: function (payload, done) {
            cartridgeServiceRepo.getOneById(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'addcartridgeservice',
        callback: function (payload, done) {
            cartridgeServiceRepo.add(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'updatecartridgeservice',
        callback: function (payload, done) {
            cartridgeServiceRepo.update(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'deletecartridgeservice',
        callback: function (payload, done) {
            cartridgeServiceRepo.delete(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }, {
        name: 'searchcartridgeservices',
        callback: function (payload, done) {
            cartridgeServiceRepo.searchcartridgeservices(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }
];