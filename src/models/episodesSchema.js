const { Schema, model } = require('mongoose');

const episodesModel = new Schema({
    title: String,
    description: String,
    temporada: Number,
    serie: String,
    episode: Number
});
module.exports = model('episodes', episodesModel);