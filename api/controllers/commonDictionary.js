/**
 * Created by madina on 03.02.2017.
 */
var commonDictionaryRepo = require('../dataLayer/commonDictionaryRepo');

module.exports = [
    {
        name: 'getstatuses',
        callback: function (payload, done) {
            commonDictionaryRepo.getstatuses(function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getstatus',
        callback: function (payload, done) {
            commonDictionaryRepo.getOneById("statuses", payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'addstatus',
        callback: function (payload, done) {
            commonDictionaryRepo.add("statuses",payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'updatestatus',
        callback: function (payload, done) {
            commonDictionaryRepo.update("statuses",payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'deletestatus',
        callback: function (payload, done) {
            commonDictionaryRepo.delete("statuses",payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }, {
        name: 'searchstatuses',
        callback: function (payload, done) {
            commonDictionaryRepo.searchstatuses(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getcolors',
        callback: function (payload, done) {
            commonDictionaryRepo.getcolors(function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getcolor',
        callback: function (payload, done) {
            commonDictionaryRepo.getOneById("colors", payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'addcolor',
        callback: function (payload, done) {
            commonDictionaryRepo.add("colors",payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'updatecolor',
        callback: function (payload, done) {
            commonDictionaryRepo.update("colors",payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'deletecolor',
        callback: function (payload, done) {
            commonDictionaryRepo.delete("colors",payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }, {
        name: 'searchcolors',
        callback: function (payload, done) {
            commonDictionaryRepo.searchcolors(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getprints',
        callback: function (payload, done) {
            commonDictionaryRepo.getprints(function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getprint',
        callback: function (payload, done) {
            commonDictionaryRepo.getOneById("prints", payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'addprint',
        callback: function (payload, done) {
            commonDictionaryRepo.add("prints",payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'updateprint',
        callback: function (payload, done) {
            commonDictionaryRepo.update("prints",payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'deleteprint',
        callback: function (payload, done) {
            commonDictionaryRepo.delete("prints",payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }, {
        name: 'searchprints',
        callback: function (payload, done) {
            commonDictionaryRepo.searchprints(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getmanufactures',
        callback: function (payload, done) {
            commonDictionaryRepo.getmanufactures(function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getmanufacture',
        callback: function (payload, done) {
            commonDictionaryRepo.getOneById("manufactures", payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'addmanufacture',
        callback: function (payload, done) {
            commonDictionaryRepo.add("manufactures",payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'updatemanufacture',
        callback: function (payload, done) {
            commonDictionaryRepo.update("manufactures",payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'deletemanufacture',
        callback: function (payload, done) {
            commonDictionaryRepo.delete("manufactures",payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }, {
        name: 'searchmanufactures',
        callback: function (payload, done) {
            commonDictionaryRepo.searchmanufactures(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }
];