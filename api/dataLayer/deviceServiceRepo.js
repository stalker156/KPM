/**
 * Created by madina on 02.02.2017.
 */
var ObjectID = require('mongodb').ObjectID;
var connector = require('./selfDb')(global.config.db.url);
var collectionName = 'deviceservices';

module.exports.getdeviceservices = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({isDeleted: false }).limit(20).toArray(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.getOneById = function(id,done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({_id: ObjectID(id), isDeleted: false }).limit(1).next(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.add = function(deviceService, done) {

    deviceService._id = new ObjectID();
    deviceService.isDeleted = false;
    deviceService.createDate = new Date();
    connector.getDB().then(function(db) {
        db.collection(collectionName).insertOne(deviceService, function(err, r) {
            if (err) done(err);
            else done(null, r);
        });
    });
};

module.exports.update = function(deviceService, done) {
    deviceService._id = new ObjectID(deviceService._id);
    deviceService.updateDate = new Date();
    connector.getDB().then(function(db) {
        db.collection(collectionName).updateOne({ _id: new ObjectID(deviceService._id) }, deviceService, function(err, r) {
            if (err) done(err);
            else done(null, r);
        });
    });
};

module.exports.delete = function(id, done) {
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
module.exports.searchdeviceservices = function (payload, done) {
    connector.getDB().then(function (db) {
        var collection = db.collection(collectionName);
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
        collection.find(query).limit(20).toArray(function (err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};