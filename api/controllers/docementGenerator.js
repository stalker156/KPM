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
                    unit:1,
                    count:1,
                    serviceNames: _.map(item.services, function(service){
                        return service.name
                    }).join(", ")
                });
            });
            var docTemplateFileName = 'report1.docx';
            var docFileId = new ObjectID();
            docFileId = docFileId.toString() + '.docx';

            var content = fs.readFileSync(path.join(__dirname, templatesFolderPath, docTemplateFileName), 'binary');
            var zip = new JSZip(content);
            var doc = new Docxtemplater();
            var result;
            doc.loadZip(zip);

            doc.setData({
                customer: 'TOO MEGA',
                itemList: list
            });

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
                throw error;
            }

            fs.writeFileSync(path.join(__dirname, filesFolderPath, docFileId), buf);

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
            fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);

            result = path.join(__dirname, filesFolderPath, docFileId);

            done(null,result);
        },
        allowAnonymous: false
    }
];