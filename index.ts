const express = require('express');
// Create a new express application instance
const app = express();
const db = require('./database')
const userRoutes = require('./src/Routes/UserRouter');
const normalizePort = require('normalize-port');
const bodyParser = require('body-parser');
const config = require('./config/config');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

try {
    app.set('llave', config.llave);
    // support parsing of application/json type post data
    app.use(bodyParser.json());
    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));

    var whitelist = ['http://localhost:3000/', 'http://10.0.75.1:3000/'];
    const corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
        // origin: function (origin: any, callback: any) {
        //     if (whitelist.indexOf(origin) !== -1) {
        //         callback(null, true)
        //     } else {
        //         callback(new Error('Not allowed by CORS'))
        //     }
        // },
        // optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions));

    //Load Routes
    app.use('/users', userRoutes);

    const port = normalizePort(process.env.PORT || '5500');
    app.listen(port, () => console.log('Escuchando por el puerto 5500!!!'));
} catch (error) {
    throw console.log('ERROR:',error);
}