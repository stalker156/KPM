/**
 * Created by madina on 02.02.2017.
 */
var ObjectID = require('mongodb').ObjectID;
var connector = require('./selfDb')(global.config.db.url);
var collectionNameStatuses = 'statuses';
var collectionNameColors = 'colors';
var collectionNamePrints = 'prints';
var collectionNameManufactures = 'manufactures';

module.exports.getstatuses = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionNameStatuses);
        collection.find({isDeleted: false }).sort({ value: 1 }).toArray(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.getOneById = function(collectionName, id,done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({_id: ObjectID(id), isDeleted: false }).limit(1).next(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.add = function(collectionName,status, done) {

    status._id = new ObjectID();
    status.isDeleted = false;
    status.createDate = new Date();
    connector.getDB().then(function(db) {
        db.collection(collectionName).insertOne(status, function(err, r) {
            if (err) done(err);
            else done(null, r);
        });
    });
};

module.exports.update = function(collectionName,status, done) {
    status._id = new ObjectID(status._id);
    status.updateDate = new Date();
    connector.getDB().then(function(db) {
        db.collection(collectionName).updateOne({ _id: new ObjectID(status._id) }, status, function(err, r) {
            if (err) done(err);
            else done(null, r);
        });
    });
};

module.exports.delete = function(collectionName,id, done) {
    connector.getDB().then(function(db) {
        db.collection(collectionName).updateOne({ _id: new ObjectID(id) }, {
            $set: {
                isDeleted: true,
                deletedDate: new Date()
            }
        }, function(err, r) {
            if (err) done(err);
            else done(null, r);
        });
    });
};
module.exports.searchstatuses = function (payload, done) {
    connector.getDB().then(function (db) {
        var collection = db.collection(collectionNameStatuses);
        var query = {
            isDeleted:false
        };
        if(payload.searchTerm){
            query["$or"] = [
                {$text: { $search:payload.searchTerm}},
                {name :new RegExp(payload.searchTerm, 'i')}
            ]
        }

        // query["name"] = new RegExp(payload.searchTerm, 'i');
        collection.find(query).sort({value:1}).toArray(function (err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.getcolors = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionNameColors);
        collection.find({isDeleted: false }).sort({ name: 1 }).toArray(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.searchcolors = function (payload, done) {
    connector.getDB().then(function (db) {
        var collection = db.collection(collectionNameColors);
        var query = {
            isDeleted:false
        };
        if(payload.searchTerm){
            query["$or"] = [
                {$text: { $search:payload.searchTerm}},
                {name :new RegExp(payload.searchTerm, 'i')}
            ]
        }

        // query["name"] = new RegExp(payload.searchTerm, 'i');
        collection.find(query).sort({name:1}).toArray(function (err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.getprints = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionNamePrints);
        collection.find({isDeleted: false }).sort({ name: 1 }).toArray(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.searchprints = function (payload, done) {
    connector.getDB().then(function (db) {
        var collection = db.collection(collectionNamePrints);
        var query = {
            isDeleted:false
        };
        if(payload.searchTerm){
            query["$or"] = [
                {$text: { $search:payload.searchTerm}},
                {name :new RegExp(payload.searchTerm, 'i')}
            ]
        }

        // query["name"] = new RegExp(payload.searchTerm, 'i');
        collection.find(query).sort({name:1}).toArray(function (err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.getmanufactures = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionNameManufactures);
        collection.find({isDeleted: false }).sort({ name: 1 }).toArray(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.searchmanufactures = function (payload, done) {
    connector.getDB().then(function (db) {
        var collection = db.collection(collectionNameManufactures);
        var query = {
            isDeleted:false
        };
        if(payload.searchTerm){
            query["$or"] = [
                {$text: { $search:payload.searchTerm}},
                {name :new RegExp(payload.searchTerm, 'i')}
            ]
        }

        // query["name"] = new RegExp(payload.searchTerm, 'i');
        collection.find(query).sort({name:1}).toArray(function (err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};