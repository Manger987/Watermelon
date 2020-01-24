"use strict";
var express = require('express');
var cors = require('cors');
// Create a new express application instance
var app = express();
var db = require('./database');
var userRoutes = require('./src/Routes/UserRouter');
var normalizePort = require('normalize-port');
var bodyParser = require('body-parser');
var config = require('./config/config');
var dotenv = require('dotenv');
dotenv.config();
try {
    // Configurar cabeceras y cors
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
    app.use(cors());
    app.set('llave', config.llave);
    // support parsing of application/json type post data
    app.use(bodyParser.json());
    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));
    //Load Routes
    app.use('/users', userRoutes);
    var port = normalizePort(process.env.PORT || '5500');
    app.listen(port, function () { return console.log('Escuchando por el puerto 5500!!!'); });
}
catch (error) {
    throw console.log('ERROR:', error);
}
