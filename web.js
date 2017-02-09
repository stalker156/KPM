global.config = require('./config/config.json');

var express = require('express'),
    app = express();

var compression = require('compression');
app.use(compression({ level: 9 }));

app.use(express.static("./web"));


app.listen(global.config.webPort);
console.log("Web magic happens on port ", global.config.webPort);

app.get('/config', function(req, res) {
    res.status(200);
    res.json({
        type: 0,
        api: global.config.apiAddress
    });
});