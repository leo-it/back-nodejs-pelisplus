const { Schema, model } = require('mongoose');

const movieModel = new Schema({
    name: String,
    email: String,
    description: String
});
module.exports = model('comentarios', movieModel);