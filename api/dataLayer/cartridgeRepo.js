/**
 * Created by madina on 02.02.2017.
 */
var ObjectID = require('mongodb').ObjectID;
var connector = require('./selfDb')(global.config.db.url);
var collectionName = 'cartridges';

var checkObjectIds = function (item) {
    if (item._id)
        item._id = new ObjectID(item._id);
    if (item.customerId)
        item.customerId = new ObjectID(item.customerId);
    if (item.printTypeId)
        item.printTypeId = new ObjectID(item.printTypeId);
    if (item.colorId)
        item.colorId = new ObjectID(item.colorId);
    if (item.deviceId)
        item.deviceId = new ObjectID(item.deviceId);
};
module.exports.getcartridges = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({isDeleted: false }).sort({ name: 1 }).toArray(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.getUtilizedCartridges = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.aggregate(
            {
                $match:{isDeleted: true }
            },
            {
                $project:{
                    ID:1,
                    model:1,
                    type:'Картридж'
                }
            },
            function(err, data) {
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
module.exports.add = function(cartridge, done) {

    cartridge._id = new ObjectID();
    cartridge.isDeleted = false;
    cartridge.createDate = new Date();
    checkObjectIds(cartridge);
    connector.getDB().then(function(db) {
        db.collection(collectionName).insertOne(cartridge, function(err, r) {
            if (err) done(err);
            else done(null, r);
        });
    });
};

module.exports.update = function(cartridge, done) {
    checkObjectIds(cartridge);
    cartridge.updateDate = new Date();
    connector.getDB().then(function(db) {
        db.collection(collectionName).updateOne({ _id: new ObjectID(cartridge._id) }, cartridge, function(err, r) {
            if (err) done(err);
            else done(null, r);
        });
    });
};
module.exports.changeStageById = function(id, stage, done) {
    connector.getDB().then(function(db) {
        db.collection(collectionName).updateOne({ _id: new ObjectID(id) }, {$set:{stage:stage}}, function(err, r) {
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
module.exports.searchcartridges = function (payload, done) {
    connector.getDB().then(function (db) {
        var collection = db.collection(collectionName);
        var query = {
            isDeleted:false
        };
        if(payload.searchTerm){
            query["$or"] = [
                {$text: { $search:payload.searchTerm}},
                {ID :new RegExp(payload.searchTerm, 'i')},
                {model :new RegExp(payload.searchTerm, 'i')}
            ]
        }

        // query["name"] = new RegExp(payload.searchTerm, 'i');
        collection.find(query).toArray(function (err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.getcartridgesandsettype = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.aggregate(
            {
                $match:{isDeleted: false }
            },
            {
                $project:{
                    ID:1,
                    model:1,
                    customerId:1,
                    type:{$literally:0}
                }
            },
            function(err, data) {
                if (err) return done(err);
                done(null, data);
            });
    });
};