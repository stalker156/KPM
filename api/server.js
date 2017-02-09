global.config = require('../config/config.json');
var generateDocument = require('./controllers/docementGenerator').generateDocument;
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('underscore');

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

app.use(bodyParser.json({limit: '5mb'}));

var router = express.Router();

router.route('/downloadFile').get(function (req, resp) {



    var payload = JSON.parse(req.query.model);

    var list = [];
    _.each(payload.items, function(item,index){
        list.push({
            index:index,
            model: item.facility.model,
            unit:'услуга',
            count:1,
            serviceNames: _.map(item.services, function(service){
                return service.name
            }).join(", ")
        });
    });
    var templateName = 'report1.docx';

    var data = {
        itemList: list
    };


    generateDocument(templateName, data, function(err, res){
        if(err) return resp.json({operationResult:1,result:null});

        resp.setHeader('Content-Type', 'application/octet-stream');
        resp.setHeader('Content-disposition', 'attachment; filename="'+encodeURI(new ObjectID())+'.docx"');

        var readStream = fs.createReadStream(res);
        readStream.on("error", function(err) {
            return resp.json({operationResult:1,result:err});
        }).pipe(resp);
    });


});
router.route('/downloadFile2').get(function (req, resp) {



    var payload = JSON.parse(req.query.model);

    var list = [];
    _.each(payload.items, function(item,index){
        list.push({
            index:index,
            model: item.facility.model,
            serialNumber: item.facility.serialNumber?item.facility.serialNumber:'',
            specification: item.facility.specification?item.facility.specification:'',
            count:1,
            comment:item.comment?item.comment:'',
            serviceNames: _.map(item.services, function(service){
                return service.name
            }).join(", ")
        });
    });
    var templateName = 'report2.docx';

    var data = {
        itemList: list
    };


    generateDocument(templateName, data, function(err, res){
        if(err) return resp.json({operationResult:1,result:null});

        resp.setHeader('Content-Type', 'application/octet-stream');
        resp.setHeader('Content-disposition', 'attachment; filename="'+encodeURI(new ObjectID())+'.docx"');

        var readStream = fs.createReadStream(res);
        readStream.on("error", function(err) {
            return resp.json({operationResult:1,result:err});
        }).pipe(resp);
    });


});
app.use('/api', router);