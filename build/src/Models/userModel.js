"use strict";
var mongoose = require('mongoose');
/*
const userSchema =  new mongoose.Schema({
    // _id:  mongoose.Schema.Types.ObjectId,
    username: String,
    password: String
});*/
var userSchema = new mongoose.Schema({
    usuario: String,
    nombre: String,
    apellido: String,
    email: String
});
module.exports = mongoose.model('Users', userSchema);
