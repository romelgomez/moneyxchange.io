// https://gist.github.com/romelgomez/3c1776fab4192c7687883c1a2b972c8c

/**
 * Vendors Dependencies
 */
import * as express from 'express';
import * as compression from 'compression';
// log requests to the console (express4)
import * as morgan from 'morgan';
// normalize the paths
// http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
import * as path from 'path';
// pull information from HTML POST (express4)
import * as bodyParser from 'body-parser';
// simulate DELETE and PUT (express4)
import * as methodOverride from 'method-override';
import * as helmet from 'helmet'; // Security


/**
 *
 *   App Dependencies
 *
 */
import { Routes } from './routes';
import { FixerProxy } from './fixer-proxy';


export class App {

  protected app: express.Application;

  constructor( NODE_ENV: string = 'development', PORT: string = '9090') {

    // Setting environment for development|production
    process.env.NODE_ENV = process.env.NODE_ENV || NODE_ENV;

    // Setting port number
    process.env.PORT = process.env.PORT || PORT;

    // Create our app w/ express
    this.app = express();
    this.app.use( helmet() );

    if ( NODE_ENV === 'development' ) {
      this.app.use( express.static( path.join(process.cwd(), 'dist/catolica' )));
      // log every request to the console
      this.app.use(morgan('dev'));
    } else {
      this.app.use( express.static( path.join( process.cwd(), 'dist/catolica' ), { immutable : true, maxAge: '7d' }));
      this.app.use(compression());
    }

    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({'extended': true}));

    // parse application/json
    this.app.use(bodyParser.json());

    // parse application/vnd.api+json as json
    this.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    this.app.use(methodOverride());

    // Setting routes
    const routes = new Routes();
    routes.paths(this.app);

    const fixerProxy = new FixerProxy();
    fixerProxy.paths(this.app);


    // START the server
    this.app.listen(process.env.PORT, function() {
      if ( NODE_ENV === 'development' ) {
        console.log('The server is running in port localhost: ', 'http://localhost:' + process.env.PORT);
      } else {
        console.log('The server is running in port:', process.env.PORT);
      }
    });

  }

}

// console.log(path.join(process.cwd(), 'dist', projectName)); // .../projects/project_name/dist/project_name
// console.log('__dirname', __dirname);                        // .../projects/project_name/dist/server
// console.log('process.cwd()', process.cwd());                // .../projects/project_name
// console.log('__filename', __filename);                      // .../projects/project_name/dist/server/app.js
