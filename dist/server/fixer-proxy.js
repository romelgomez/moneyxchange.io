'use strict';
exports.__esModule = true;
var rp = require('request-promise');
var FixerProxy = /** @class */ (function () {
    function FixerProxy() {
    }
    FixerProxy.prototype.paths = function (app) {
        app.post('/api/fixer/symbols', function (req, res) {
            rp({
                uri: 'http://data.fixer.io/api/symbols',
                qs: {
                    access_key: process.env.FIXER_API_KEY
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            })
                .then(function (response) {
                res.send(response);
            }, function (error) {
                res.send(error);
            });
        });
        app.post('/api/fixer/latest', function (req, res) {
            var latestOptions = req.body;
            rp({
                uri: 'http://data.fixer.io/api/latest',
                qs: {
                    access_key: process.env.FIXER_API_KEY,
                    base: typeof latestOptions['base'] !== 'undefined' ? latestOptions['base'] : undefined,
                    symbols: typeof latestOptions['symbols'] !== 'undefined' ? latestOptions['symbols'] : undefined
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            })
                .then(function (response) {
                res.send(response);
            }, function (error) {
                res.send(error);
            });
        });
    };
    return FixerProxy;
}());
exports.FixerProxy = FixerProxy;
