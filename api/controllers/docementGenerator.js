/**
 * Created by madina on 09.02.2017.
 */
var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

var ObjectID = require('mongodb').ObjectID;

var filesFolderPath = '../files/';
var templatesFolderPath = '../templates/';
var _ = require('underscore');
module.exports = [
    {
        name: 'getreport1file',
        callback: function (payload, done) {
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
            generateDocument(templateName, data, function(error, result){
                if(error)return done(error);
                done(null, result);
            });
        },
        allowAnonymous: false
    },
    {
        name: 'getreport2file',
        callback: function (payload, done) {
            var list = [];
                _.each(payload.items, function(item,index){
                list.push({
                    index:index,
                    model: item.facility.model,
                    serialNumber: item.facility.serialNumber,
                    specification: item.facility.specification,
                    count:1,
                    comment:item.comment,
                    serviceNames: _.map(item.services, function(service){
                        return service.name
                    }).join(", ")
                });
            });
            var templateName = 'report2.docx';

            var data = {
                itemList: list
            };
            generateDocument(templateName, data, function(error, result){
                if(error)return done(error);
                done(null, result);
            });
        },
        allowAnonymous: false
    }
];
function generateDocument(templateName, data, callback) {
    var docFileId = new ObjectID().toString() + '.docx';
    var content = fs.readFileSync(path.join(__dirname, templatesFolderPath, templateName), 'binary');
    var zip = new JSZip(content);
    var doc = new Docxtemplater();
    var result;
    doc.loadZip(zip);

    doc.setData(data);

    try {
        doc.render()
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
        };
        console.log(JSON.stringify({error: e}));
        return callback(error);
    }

    var buf = doc.getZip().generate({type: "nodebuffer", compression: "DEFLATE"});
    fs.writeFileSync(path.join(__dirname, filesFolderPath, docFileId), buf);

    result = path.join(__dirname, filesFolderPath, docFileId);

    callback(null, result);
}