'use strict';

// normalize the paths : http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
import * as path from 'path';
import * as express from 'express';


export class Routes {

  defaultRoute(req: express.Request, res: express.Response) {
    res.sendFile('index.html', {
      root: path.join(process.cwd(), 'dist/catolica', )
    });
  }

  paths(app: express.Application) {

    app.get('/', (req: express.Request, res: express.Response) => {
      this.defaultRoute(req, res);
    });

    app.get('*', (req: express.Request, res: express.Response) => {
      this.defaultRoute(req, res);
    });

  }


}
