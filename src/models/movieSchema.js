const { Schema, model } = require('mongoose');

const movieModel = new Schema({
    title: String,
    description: String,
    gender: String,
    img: String,
    url: String,
    year: String

});
module.exports = model('peliculas', movieModel);