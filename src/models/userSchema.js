const { Schema, model } = require('mongoose');

const userModel = new Schema({
    name: String,
    email: String
});
module.exports = model('usuarios', userModel);