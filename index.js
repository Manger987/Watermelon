const express = require('express');
const app = express();
const db = require('./database')
const userRoutes = require('./src/Routes/UserRouter')
const normalizePort = require('normalize-port');

app.get('/', async (req, res, next) => {
    const items = await Items.find();
    res.json(items);
})

app.use('/users', userRoutes);

const port = normalizePort(process.env.PORT || '3000');
app.listen(port, () => console.log('Escuchando por el puerto 3000!!!'));