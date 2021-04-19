const { Schema, model } = require('mongoose');

const serieModel = new Schema({
    title: String,
    description: String,
    img: String,
    episodes: [String]

});
module.exports = model('serie', serieModel);