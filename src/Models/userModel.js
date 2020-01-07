const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    username: String,
    password: String
});

const Users = mongoose.model('Users',userSchema);
module.exports = Users;