const { Schema, model } = require('mongoose');

const ClientModel = new Schema({
    name: String,
    email: String,
    dni: Number
});
module.exports = model('cliente', ClientModel);