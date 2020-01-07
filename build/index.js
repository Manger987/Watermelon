"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// Create a new express application instance
var app = express();
var db = require('./database');
var userRoutes = require('./src/Routes/UserRouter');
var normalizePort = require('normalize-port');
var bodyParser = require('body-parser');
try {
    // support parsing of application/json type post data
    app.use(bodyParser.json());
    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));
    //Load Routes
    app.use('/users', userRoutes);
    var port = normalizePort(process.env.PORT || '3000');
    app.listen(port, function () { return console.log('Escuchando por el puerto 3000!!!'); });
}
catch (error) {
    throw console.log('ERROR:', error);
}
