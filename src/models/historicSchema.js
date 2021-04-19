const { Schema, model } = require('mongoose');

const HistoricoModel = new Schema({
    title: String,
    email: String,
    gender: String
});
module.exports = model('historico', HistoricoModel);