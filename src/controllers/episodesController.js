const express = require('express')
const Episode = require('../models/episodesSchema');


//declaramos las funciones asi ya se exportan
module.exports = {
    async get_episode(req, res) {

        const episode = await Episode.find();
        if (episode) return res.status(200).json({ episode });
        else return res.status(404).json({ error: "Not found" });
    },
    async post_episode(req, res) {
        const { title, description, temporada, serie, episode } = req.body;
        console.log(title, description, temporada, serie);

        if (title && description) {
            const checkEpisode = await Episode.findOne({ title });
            if (!checkEpisode) {
                const newEpisode = new Episode(req.body);
                await newEpisode.save();
                console.log(newEpisode);

                return res.status(201).json({ episode: req.body });
            } else {
                return res.status(400).json({ error: " ya existe el nobre" });
            }
        } else {

            return res.status(400).json({ error: "no hay propiedades suficientes" });

        }
    },
    async put_episode(req, res) {
        const { id } = req.params;
        const { title, description, temporada, serie } = req.body;
        const update = {};
        if (title) update.title = title;
        if (description) update.description = description;
        if (temporada) update.temporada = temporada;
        if (serie) update.serie = serie;
        if (episode) update.episode = episode;



        const updateEpisode = await Episode.updateOne({
            $or: [
                { "_id": id },


            ]
        }, update);
        if (updateEpisode.n) { //n == numero de documentos modificados
            return res.status(200).json({ ok: true })
        } else {
            return res.status(404).json({ error: "Episode not found" });
        }
    },
    async delete_episode(req, res) {
        const { id } = req.params;
        console.log(id);
        if (!id) return res.status(400).json({ error: "Not enough parameters" });
        Episode.findByIdAndDelete(id, (err) => {

            if (err) {
                console.log(err)
                return res.status(400).json({ error: "episodio eliminado" });

            } else {
                console.log("Deleted : ", title);
                return res.status(200).json({ error: "episodio eliminado" });

            }
        });
    }
}