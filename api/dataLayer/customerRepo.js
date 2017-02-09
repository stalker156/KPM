/**
 * Created by madina on 02.02.2017.
 */
var ObjectID = require('mongodb').ObjectID;
var connector = require('./selfDb')(global.config.db.url);
var collectionName = 'customers';

module.exports.getCustomers = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({isDeleted: false }).sort({ name: 1 }).toArray(function(err, data) {
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
module.exports.add = function(customer, done) {

    customer._id = new ObjectID();
    customer.isDeleted = false;
    customer.createDate = new Date();
    connector.getDB().then(function(db) {
        db.collection(collectionName).insertOne(customer, function(err, r) {
            if (err) done(err);
            else done(null, r);
        });
    });
};

module.exports.update = function(customer, done) {
    customer._id = new ObjectID(customer._id);
    customer.updateDate = new Date();
    connector.getDB().then(function(db) {
        db.collection(collectionName).updateOne({ _id: new ObjectID(customer._id) }, customer, function(err, r) {
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
module.exports.searchcustomers = function (payload, done) {
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
        collection.find(query).sort({name:1}).toArray(function (err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};