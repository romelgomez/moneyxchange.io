'use strict';
import * as express from 'express';
const rp = require('request-promise');

// *** Endpoint in free plan are: latest, symbols. ***

// Set an env var FIXER_API_KEY for security

// Open a terminal (by pressing CtrlAltT)
// sudo -H nano /etc/environment
// Type your password
// Edit the text file just opened:
// e.g. just write FIXER_API_KEY='api_key' in a new line
// Save it
// Once saved, logout and login again.
// Your required changes are made.


interface FixerAPI {
    uri: string;
    qs: {
        access_key: string,
        base?: string,
        symbols?: string
    };
    headers: {
        'User-Agent': string
    };
    json: boolean;
}

export class FixerProxy {

    paths(app: express.Application) {

        app.post('/api/fixer/symbols', (req: express.Request, res: express.Response) => {

            rp({
                uri: 'http://data.fixer.io/api/symbols',
                qs: {
                    access_key: process.env.FIXER_API_KEY,
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            })
            .then(function ( response: Object ) {
                res.send(response);
            }, function ( error: Object ) {
                res.send(error);
            });

        });

        app.post('/api/fixer/latest', (req: express.Request, res: express.Response) => {

            const latestOptions = req.body;

            rp({
                uri: 'http://data.fixer.io/api/latest',
                qs: {
                    access_key: process.env.FIXER_API_KEY,
                    base: typeof latestOptions['base']      !== 'undefined' ? latestOptions['base'] : undefined,
                    symbols: typeof latestOptions['symbols']      !== 'undefined' ? latestOptions['symbols'] : undefined
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            })
            .then(function ( response: Object ) {
                res.send(response);
            }, function ( error: Object ) {
                res.send(error);
            });


        });

    }

}
