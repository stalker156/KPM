var ObjectID = require('mongodb').ObjectID;
var connector = require('./selfDb')(global.config.db.url);
var collectionName = 'tokens';
var moment = require('moment');

module.exports.getByToken = function(token, done) {
    connector.getDB().then(function(db) {
        db.collection(collectionName).find({ token: token, isDeleted: false }).limit(1).next(function(err, data) {
            if (err) done(err);
            else {
                done(null, data);
            }
        });

    });

}

module.exports.add = function(token, done) {
    token.createDate = new Date();
    token.user = new ObjectID(token.user);
    token.isDeleted = false;
    //token.validThru = token.isPermanent ? moment().add(10080, "M") : moment().add(40, "m");
    connector.getDB().then(function(db) {
        db.collection(collectionName).insertOne(token, function(err, data) {
            if (err) done(err);
            else done(null, data);
        });
    });
}

module.exports.updateValidThru = function(token, done) {

    connector.getDB().then(function(db) {
        db.collection(collectionName).updateOne({ _id: token._id }, { $set: { 'validThru': token.isPermanent ? moment().add(10080, "M").toDate() : moment().add(40, "m").toDate() } }, function(err, data) {
            if (err) done(err);
            else done(null, data);
        });
    });
};


module.exports.closeUserTokens = function(userId, done) {
    connector.getDB().then(function(db) {
        db.collection(collectionName).updateMany({ user: new ObjectID(userId) }, { $set: { isDeleted: true } }, function(err) {
            done();
        });
    });
}