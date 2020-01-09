const express = require('express');
const Users = require('./../Models/user');
import labels from './../utils/labels.json';
import { registerEnds } from './../utils';
const bcrypt = require('bcrypt');
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
        if (req.body.username) {
            const user = await Users.find({ username : req.body.username});
            if (user && user.username) throw labels.Error.UsuarioExistente; //hacer control de errores, para que no solo envie un mensaje sino un objeto con status y mensaje del error.
            req.body.password = await bcrypt.hash(req.body.password, process.env.BCRYPT_SALT_ROUNDS);
            Users.create(req.body, async function (error: any, save: any) {
                if (error) throw error
                res.json(await registerEnds(200, save)); // saved!
            });
        } else {
            throw labels.Error.UsuarioInexistente;
        }
        
    } catch (error) {
        throw error.message;
    }
})

router.post('/authenticate', async (req: any, res: any, next: any) => {
    
    if (req.body.username && req.body.password) {
        const user = await Users.find({ username : req.body.username});
            if (user && user.username) throw labels.Error.UsuarioExistente;
            console.log('aqui:', process.env.BCRYPT_SALT_ROUNDS);
        // if(req.body.username === user.username && req.body.password) {
        //     const payload = {
        //     check:  true
        //     };
        //     const token = jwt.sign(payload, app.get('llave'), {
        //     expiresIn: 1440
        //     });
        //     res.json({
        //     mensaje: 'Autenticación correcta',
        //     token: token
        //     });
        //         } else {
        //             res.json({ mensaje: "Usuario o contraseña incorrectos"})
        //         }
    }  else {
        throw labels.Error.UsuarioPasswordInexistente;
    }          
});

module.exports = router;