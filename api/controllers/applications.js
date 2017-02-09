/**
 * Created by madina on 02.02.2017.
 */
var applicationRepo = require('../dataLayer/applicationRepo');
var cartridgeRepo = require('../dataLayer/cartridgeRepo');
var deviceRepo = require('../dataLayer/deviceRepo');
var async = require('async');

module.exports = [
    {
        name: 'getapplications',
        callback: function (payload, done) {
            applicationRepo.getapplications(function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getapplicationsbystage',
        callback: function (payload, done) {
            applicationRepo.getapplicationsbystage(payload.stage,function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getapplicationsbystages',
        callback: function (payload, done) {
            applicationRepo.getapplicationsbystages(payload.stages,function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getapplication',
        callback: function (payload, done) {
            applicationRepo.getOneById(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'addapplication',
        callback: function (payload, done) {
            applicationRepo.add(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'updateapplication',
        callback: function (payload, done) {
            applicationRepo.update(payload, function (err, data) {
            if (err) return done(err);
            done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'closeapplication',
        callback: function (payload, done) {
            applicationRepo.closeapplication(payload, function (err, data) {
                if (err) return done(err);
                async.each(payload.items, function(item, doneEach){
                    if(item.type==0){
                        cartridgeRepo.changeStageById(item.facility._id, 2, function(err, res){
                            if(err)return done(err);
                            doneEach();
                        })
                    }
                    else if(item.type==1){
                        deviceRepo.changeStageById(item.facility._id, 2, function(err, res){
                            if(err)return done(err);
                            doneEach();
                        })
                    }
                    else doneEach();
                },function(err){
                    if(err)return done(err);
                    done(null, data);

                })
            });
        },
        allowAnonymous: false
    },
    {
        name: 'acceptapplication',
        callback: function (payload, done) {
            applicationRepo.acceptapplication(payload, function (err, data) {
                if (err) return done(err);
                async.each(payload.items, function(item, doneEach){
                    if(item.type==0){
                        cartridgeRepo.changeStageById(item.facility._id, 1, function(err, res){
                            if(err)return done(err);
                            doneEach();
                        })
                    }
                    else if(item.type==1){
                        deviceRepo.changeStageById(item.facility._id, 1, function(err, res){
                            if(err)return done(err);
                            doneEach();
                        })
                    }
                    else doneEach();
                },function(err){
                    if(err)return done(err);
                    done(null, data);

                })
            });
        },
        allowAnonymous: false
    },
    {
        name: 'deleteapplication',
        callback: function (payload, done) {
            applicationRepo.delete(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'searchapplications',
        callback: function (payload, done) {
            applicationRepo.searchapplications(payload, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getapplicationsbyitemid',
        callback: function (payload, done) {
            applicationRepo.getapplicationsbyitemid(payload.id, function (err, data) {
                if (err) return done(err);
                done(null, data);
            });
        },
        allowAnonymous: false
    }
];
