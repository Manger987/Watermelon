const express = require('express');
const Users = require('./../Models/user');
const router = express.Router();

router.get('/', async (req: any, res: any, next: any) => {
    try{
        const users = await Users.find();
        await res.json(users);
    } catch (error) {
        throw console.log(error.message);
    }
})

router.post('/register', async (req: any, res: any, next: any) => {
    try{
        console.log(req.body);
        const users = await Users.find({ username : req.body.username});
        if (users && users.username) throw 'usuario existente';
        Users.create(req.body, function (error: any, small: any) {
            if (error) throw error
            // saved!
            res.json(users);
        });
        // const users = await Users.find();
        // await res.json(users);
    } catch (error) {
        throw console.log(error.message);
    }
})

module.exports = router;