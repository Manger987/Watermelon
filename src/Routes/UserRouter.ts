const express = require('express');
const Users = require('./../Models/user');
import labels from './../utils/labels.json';
import { registerEnds } from './../utils';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const cors = require('cors')

router.get('/', async (req: any, res: any, next: any) => {
    try{
        const users = await Users.find();
        await res.json(users);
    } catch (error) {
        throw res.json(error.message);
    }
})

router.post('/register', cors(),async (req: any, res: any, next: any) => {
    try{
        if (req.body.username) {
            const user = await Users.findOne({ username : req.body.username});
            if (user && user.username)
                throw new SyntaxError(labels.Error.UsuarioExistente); //hacer control de errores, para que no solo envie un mensaje sino un objeto con status y mensaje del error.
                     
            req.body.password = await bcrypt.hash(req.body.password, 12);
            Users.create(req.body, async function (error: any, save: any) {
                if (error) throw error
                res.json(await registerEnds(200, save)); // saved!
            });
        } else {
            throw labels.Error.UsuarioInexistente;
        }
        
    } catch (error) {
        console.log('aqui error');
        res.json(error.message);
    }
})

router.post('/authenticate', cors(), async (req: any, res: any, next: any) => {
    
    if (req.body.username && req.body.password) {
        const user = await Users.findOne({ username : req.body.username});
        if (user && user.username) {
            if (bcrypt.compare(req.body.password, user.password)) { // same password
                const payload = {
                    check:  true
                   };
                   const token = jwt.sign(payload, process.env.KEYJWT, {
                    expiresIn: 1440
                   });
                   if (token) {
                        res.json({
                            mensaje: 'Autenticación correcta',
                            token: token
                        });
                    } else {
                        throw new SyntaxError(labels.Error.NotToken);
                    }
            } else {
                throw new SyntaxError(labels.Error.UsuarioPasswordDiferentes);
            }
        } else {
            throw new SyntaxError(labels.Error.UsuarioInexistente);
        }
    }  else {
        throw labels.Error.UsuarioPasswordInexistente;
    }          
});

module.exports = router;