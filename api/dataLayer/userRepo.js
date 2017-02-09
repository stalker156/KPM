/**
 * Created by Alibek on 06.03.2016.
 */
var ObjectID = require('mongodb').ObjectID;
var connector = require('./selfDb')(global.config.db.url);
var collectionName = 'users';

module.exports.add = function(user, done) {
    user.isDeleted = false;
    connector.getDB().then(function(db) {
        db.collection(collectionName).insertOne(user, function(err, data) {
            if (err) done(err);
            else done(null, data);
        });
    });
}


module.exports.get = function(id, done) {
    connector.getDB().then(function(db) {
        db.collection(collectionName).find({ _id: new ObjectID(id) },{password:0}).limit(1).next(function(err, data) {
            if (err) done(err);
            else done(null, data);
        });
    });
}


module.exports.login = function(userName, pwd, done) {
    connector.getDB().then(function(db) {
        db.collection(collectionName).find({
            userName: userName,
            isDeleted: false
        }).limit(1).next(function(err, data) {
            if (err) done(err);
            else {
                if (data && data.password === pwd)
                    done(null, data);
                else done();
            }
        });
    });
}
module.exports.getOneById = function(id,done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({_id: ObjectID(id), isDeleted: false },{password:0}).limit(1).next(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};

module.exports.update = function(status, done) {
    status._id = new ObjectID(status._id);
    status.updateDate = new Date();
    connector.getDB().then(function(db) {
        db.collection(collectionName).updateOne({ _id: new ObjectID(status._id) }, status, function(err, r) {
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
module.exports.getusers = function(done) {
    connector.getDB().then(function(db) {
        var collection = db.collection(collectionName);
        collection.find({isDeleted: false },{password:0}).sort({ name: 1 }).limit(20).toArray(function(err, data) {
            if (err) return done(err);
            done(null, data);
        });
    });
};