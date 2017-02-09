/**
 * Created by madina on 02.02.2017.
 */
var ObjectID = require('mongodb').ObjectID;
var connector = require('./selfDb')(global.config.db.url);
var collectionName = 'applications';
var countersCollectionName = 'counter';
var _ = require('underscore');
var checkObjectIds = function (application){
    if(application._id)
        application._id = new ObjectID(application._id);
    _.each(application.items, function(item){
        if(item.facility && item.facility._id)
            item.facility._id = new ObjectID(item.facility._id);
        _.each(item.services, function(service){
            service._id = new ObjectID(service._id);
        });
        _.each(item.doneServices, function(service){
            service._id = new ObjectID(service._id);
        });
    });
}
module.exports.getapplications = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({stage:0,isDeleted: false }).sort({ name: 1 }).limit(20).toArray(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.getapplicationsbystage = function(stage,done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({stage:stage,isDeleted: false }).sort({ name: 1 }).limit(20).toArray(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.getapplicationsbystages = function(stages,done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({stage:{$in:stages},isDeleted: false }).sort({ name: 1 }).limit(20).toArray(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.getUtilizedapplications = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({isDeleted: true }).sort({ name: 1 }).limit(20).toArray(function(err, data) {
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

module.exports.add = function(application, done) {
    application.isDeleted = false;
    application.createDate = new Date();
    application.createUser = application.user;
    checkObjectIds(application);
    getNextSequence('applicationNumber').then(value => {
        application.number = value;
        connector.getDB().then(function (db) {
            db.collection(collectionName).insertOne(application, function (err, r) {
                if (err) done(err);
                else done(null, r);
            });
        });
    }).catch(err =>{
        done(err)
    });
};

module.exports.update = function(application, done) {
    application.updateDate = new Date();
    checkObjectIds (application);
    connector.getDB().then(function(db) {
        db.collection(collectionName).updateOne({ _id: new ObjectID(application._id) }, application, function(err, r) {
            if (err) done(err);
            else done(null, r);
        });
    });
};

module.exports.acceptapplication = function(application, done) {
    application.acceptDate = new Date();
    application.acceptUser = application.user;
    application.stage = 1;
    checkObjectIds (application);
    connector.getDB().then(function(db) {
        db.collection(collectionName).updateOne({ _id: new ObjectID(application._id) }, application, function(err, r) {
            if (err) done(err);
            else done(null, r);
        });
    });
};

module.exports.closeapplication = function(application, done) {
    application.closeDate = new Date();
    application.stage = 2;
    application.closeUser = application.user;
    checkObjectIds (application);
    connector.getDB().then(function(db) {
        db.collection(collectionName).updateOne({ _id: new ObjectID(application._id) }, application, function(err, r) {
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
module.exports.searchapplications = function (payload, done) {
    connector.getDB().then(function (db) {
        var collection = db.collection(collectionName);
        var query = {
            isDeleted:false
        };
        if(payload.stages){
            query["stage"] = { $in:payload.stages}
        }
        if(payload.searchTerm){
            query["$text"] = { $search:payload.searchTerm}
        }
        console.log("searchTerm", payload.searchTerm);

        // query["name"] = new RegExp(payload.searchTerm, 'i');
        collection.find(query).sort({name:1}).limit(20).toArray(function (err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
module.exports.getapplicationsbyitemid = function(id,done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({"items.facility._id": new ObjectID(id), isDeleted: false }).sort({ createDate: -1 }).limit(20).toArray(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};
function getNextSequence(name) {
    return new Promise((resolve, reject) =>{
        connector.getDB().then(function (db) {
            db.collection(countersCollectionName).find({fieldName:name}).limit(1).next(function(err,res){
                if(err) return reject(err);
                if(res){
                    db.collection(countersCollectionName).findAndModify(
                        {fieldName: name},
                        [],
                        {$inc: {seq: 1}},
                        {new: true}
                        , function(err, data){
                            if(err)return reject(err);
                            resolve(data.value.seq);
                        });
                }
                else{
                    var counter = {
                        _id: new ObjectID(),
                        fieldName:name,
                        seq:1
                    };
                    db.collection(countersCollectionName).insertOne(counter, function (err, r) {
                        if (err) return reject(err);
                        resolve(1);
                    });
                }
            });
        });
    });

}
