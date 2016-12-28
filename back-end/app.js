// ----------------------------------------------------------------------------
// Copyright (c) 2015 Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------

// This is a base-level Azure Mobile App SDK.
var express = require('express');
var azureMobileApps = require('azure-mobile-apps');
var bodyParser = require('body-parser');

// Set up a standard Express app
var app = express();

// If you are producing a combined Web + Mobile app, then you should handle
// anything like logging, registering middleware, etc. here

// Configuration of the Azure Mobile Apps can be done via an object, the
// environment or an auxiliary file.  For more information, see
// http://azure.github.io/azure-mobile-apps-node/global.html#configuration
var mobile = azureMobileApps({
    swagger: true
});

var request = require('request');
var googleAPIKey = 'AIzaSyB1FeVNtCVEF6QKTquVuRYdX5IxInJZuYY';

// Import the files from the tables directory to configure the /tables endpoint
mobile.tables.import('./tables');

// Import the files from the api directory to configure the /api endpoint
mobile.api.import('./api');

// Initialize the database before listening for incoming requests
// The tables.initialize() method does the initialization asynchronously
// and returns a Promise.
mobile.tables.initialize()
    .then(function () {
        app.use(bodyParser());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.use(mobile);    // Register the Azure Mobile Apps middleware
        app.get('/', function(req, res) { res.send('Welcome to drink lover api'); });
        app.get('/places/info', function(req, res) {
            request('https://maps.googleapis.com/maps/api/place/textsearch/json?location='+ req.query.location +'&query=%E9%A3%B2%E6%96%99%E5%BA%97&key=AIzaSyB1FeVNtCVEF6QKTquVuRYdX5IxInJZuYY', function (error, response, body) {
                if(error) res.json('{"error":"' + error + '"}');
                else res.send(body);
            });
        });
        app.listen(process.env.PORT || 3000);   // Listen for requests
    });
