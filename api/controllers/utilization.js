var cartridgeRepo = require('../dataLayer/cartridgeRepo');
var deviceRepo = require('../dataLayer/deviceRepo');

module.exports = [
    {
        name: 'getutilizations',
        callback: function (payload, done) {
            cartridgeRepo.getUtilizedCartridges(function (err, data) {
                if (err) return done(err);
                deviceRepo.getUtilizedDevices(function (err, data2) {
                    if (err) return done(err);
                    var result = data.concat(data2);
                    console.log(result);
                    done(null, result);
                });
            });
        },
        allowAnonymous: false
    }
]