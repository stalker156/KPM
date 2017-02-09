/**
 * Created by Alibek on 11.02.2016.
 */
"use strict";
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
var db_config = global.config.db;

var connector = function(url) {
    var self = {};

    self.DB;
    self.connecting = false;
    self.URL = url;
    self.connect = () => {
        return new Promise((resolve, reject) => {
            if (!self.DB) {
                console.log("connect to ", db_config.url);
                MongoClient.connect(db_config.url, {
                    server: {
                        poolSize: 100,
                        socketOptions: {
                            connectTimeoutMS: 5000,
                            autoReconnect: true,
                            keepAlive: true
                        }
                    }
                }).then((db) => {
                    self.DB = db;
                    self.DB.on('close', function() {
                        self.DB = null;
                        //dbConnect();
                    })
                    self.DB.on('error', function(err) {
                        console.log('Error mongo connection ', err);
                    });
                    console.log('connected to db ', new Date());
                    return resolve(self.DB);
                }).catch(reject);
            } else
                resolve(self.DB);
        });
    }

    if (!self.DB) {
        self.connect();
    }

    self.getDB = function() {
        return new Promise((resolve, reject) => {
            if (self.DB)
                return resolve(self.DB);
            setTimeout(() => {
                self.connect().then(() => {
                    return self.getDB().then(resolve).catch(reject);
                }).catch((err) => {
                    console.error(err);
                    return self.getDB().then(resolve).catch(reject);
                });
            }, 1000);
        });
    }

    self.query = function(cb) {
        if (!self.DB) {
            self.connect().then(() => {
                this.query(cb);
            }).catch(err => {
                console.error(err);
            });
        } else {
            // console.log('yes db');
            cb(self.DB);
        }
    }



    return self;
}


module.exports = connector;