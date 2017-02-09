/**
 * Created by madina on 02.02.2017.
 */
var customerRepo = require('../dataLayer/customerRepo');

module.exports = [
    {
        name: 'getcustomers',
        callback: function (payload, done) {
            customerRepo.getCustomers(function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getcustomer',
        callback: function (payload, done) {
            customerRepo.getOneById(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'addcustomer',
        callback: function (payload, done) {
            customerRepo.add(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'updatecustomer',
        callback: function (payload, done) {
            customerRepo.update(payload, function (err, data) {
            if (err) return done(err);
            done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'deletecustomer',
        callback: function (payload, done) {
            customerRepo.delete(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }, {
        name: 'searchcustomers',
        callback: function (payload, done) {
            customerRepo.searchcustomers(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }
];
