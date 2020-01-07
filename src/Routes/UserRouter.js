const express = require('express');
const Users = require('../Models/userModel');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        console.log('user Router');
        res.send('HElo world');
        // const users = await Users.find();
        // await res.json(users);
    } catch (error) {
        throw console.log(error.message);
    }
})

router.post('/register', async (req, res, next) => {
    try{
        res.json(req.body.hello);
        console.log(req.body);

        // const users = await Users.find();
        // await res.json(users);
    } catch (error) {
        throw console.log(error.message);
    }
})

module.exports = router;