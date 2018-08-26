"use strict";
// https://gist.github.com/romelgomez/3c1776fab4192c7687883c1a2b972c8c
exports.__esModule = true;
/**
 * Vendors Dependencies
 */
var express = require("express");
var compression = require("compression");
// log requests to the console (express4)
var morgan = require("morgan");
// normalize the paths
// http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
var path = require("path");
// pull information from HTML POST (express4)
var bodyParser = require("body-parser");
// simulate DELETE and PUT (express4)
var methodOverride = require("method-override");
var helmet = require("helmet"); // Security
/**
 *
 *   App Dependencies
 *
 */
var routes_1 = require("./routes");
var fixer_proxy_1 = require("./fixer-proxy");
var App = /** @class */ (function () {
    function App(NODE_ENV, PORT) {
        if (NODE_ENV === void 0) { NODE_ENV = 'development'; }
        if (PORT === void 0) { PORT = '9090'; }
        // Setting environment for development|production
        process.env.NODE_ENV = process.env.NODE_ENV || NODE_ENV;
        // Setting port number
        process.env.PORT = process.env.PORT || PORT;
        // Create our app w/ express
        this.app = express();
        this.app.use(helmet());
        if (NODE_ENV === 'development') {
            this.app.use(express.static(path.join(process.cwd(), 'dist/catolica')));
            // log every request to the console
            this.app.use(morgan('dev'));
        }
        else {
            this.app.use(express.static(path.join(process.cwd(), 'dist/catolica'), { immutable: true, maxAge: '7d' }));
            this.app.use(compression());
        }
        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ 'extended': true }));
        // parse application/json
        this.app.use(bodyParser.json());
        // parse application/vnd.api+json as json
        this.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
        this.app.use(methodOverride());
        // Setting routes
        var routes = new routes_1.Routes();
        routes.paths(this.app);
        var fixerProxy = new fixer_proxy_1.FixerProxy();
        fixerProxy.paths(this.app);
        // START the server
        this.app.listen(process.env.PORT, function () {
            if (NODE_ENV === 'development') {
                console.log('The server is running in port localhost: ', 'http://localhost:' + process.env.PORT);
            }
            else {
                console.log('The server is running in port:', process.env.PORT);
            }
        });
    }
    return App;
}());
exports.App = App;
// console.log(path.join(process.cwd(), 'dist', projectName)); // .../projects/project_name/dist/project_name
// console.log('__dirname', __dirname);                        // .../projects/project_name/dist/server
// console.log('process.cwd()', process.cwd());                // .../projects/project_name
// console.log('__filename', __filename);                      // .../projects/project_name/dist/server/app.js
