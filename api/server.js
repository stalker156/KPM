global.config = require('../config/config.json');

var express = require('express'),
    io = require('socket.io'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = io.listen(server);

io.set('transports', ['websocket']);

server.listen(global.config.apiPort);
console.log('Magic happen on ' + global.config.apiPort);

//var db = require('./dataLayer/slefDb')(global.config.db.url);


setTimeout(function() {

    var register = require('./controllers/socketRegister');
    
    register(io, require('./controllers/security'));
    register(io, require('./controllers/menu'));
    register(io, require('./controllers/applications'));
    register(io, require('./controllers/cartridge'));
    register(io, require('./controllers/device'));
    register(io, require('./controllers/customer'));
    register(io, require('./controllers/cartridgeService'));
    register(io, require('./controllers/deviceService'));
    register(io, require('./controllers/commonDictionary'));
    register(io, require('./controllers/utilization'));
    register(io, require('./controllers/docementGenerator'));

}, 5000);