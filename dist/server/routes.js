'use strict';
exports.__esModule = true;
// normalize the paths : http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
var path = require("path");
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.defaultRoute = function (req, res) {
        res.sendFile('index.html', {
            root: path.join(process.cwd(), 'dist/catolica')
        });
    };
    Routes.prototype.paths = function (app) {
        var _this = this;
        app.get('/', function (req, res) {
            _this.defaultRoute(req, res);
        });
        app.get('*', function (req, res) {
            _this.defaultRoute(req, res);
        });
    };
    return Routes;
}());
exports.Routes = Routes;
