import express = require('express');
// Create a new express application instance
const app: express.Application = express();
const db = require('./database')
const userRoutes = require('./src/Routes/UserRouter');
const normalizePort = require('normalize-port');
const bodyParser = require('body-parser');

try {
    // support parsing of application/json type post data
    app.use(bodyParser.json());
    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));

    //Load Routes
    app.use('/users', userRoutes);

    const port = normalizePort(process.env.PORT || '3000');
    app.listen(port, () => console.log('Escuchando por el puerto 3000!!!'));
} catch (error) {
    throw console.log('ERROR:',error);
}