"use strict";
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String
});
module.exports = mongoose.model('Users', userSchema);
