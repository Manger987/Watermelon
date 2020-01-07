const express = require('express');
const Users = require('./../Models/userModel');
const router = express.Router();

router.get('/', async (req: any, res: any, next: any) => {
    try{
        // const users = await Users.find();
        // await res.json(users);
    } catch (error) {
        throw console.log(error.message);
    }
})

router.post('/register', async (req: any, res: any, next: any) => {
    try{
        console.log(req.body);
        const register = new Users(req.body);
        register.save(function (error: any) {
        if (error) throw error;
            // saved
            res.json(req.body);
        });
        // const users = await Users.find();
        // await res.json(users);
    } catch (error) {
        throw console.log(error.message);
    }
})

module.exports = router;