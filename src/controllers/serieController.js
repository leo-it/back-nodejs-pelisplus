const express = require('express')
const Serie = require('../models/seriesSchema');


//declaramos las funciones asi ya se exportan
module.exports = {
    async get_serie(req, res) {

        const serie = await Serie.find();
        if (serie) return res.status(200).json({ serie });
        else return res.status(404).json({ error: "Not found" });
    },
    async post_serie(req, res) {
        const { title, description, img, episodes } = req.body;
        console.log(title, description);

        if (title && description) {
            const checkSerie = await Serie.findOne({ title });
            if (!checkSerie) {
                const newSerie = new Serie(req.body);
                await newSerie.save();
                console.log(newSerie);

                return res.status(201).json({ Serie: req.body });
            } else {
                return res.status(400).json({ error: " ya existe el nobre" });
            }
        } else {

            return res.status(400).json({ error: "no hay propiedades suficientes" });

        }
    },
    async put_serie(req, res) {
        const { titleordescription } = req.params;
        const { title, description } = req.body;
        const update = {};
        if (title) update.title = title;
        if (description) update.description = description;


        const updateSerie = await Serie.updateOne({
            $or: [
                { "title": titleordescription },
                { "description": titleordescription }
            ]
        }, update);
        if (updateSerie.n) { //n == numero de documentos modificados
            return res.status(200).json({ ok: true })
        } else {
            return res.status(404).json({ error: "Serie not found" });
        }
    },
    async delete_serie(req, res) {
        const { id, title } = req.params;
        console.log(id);
        if (!id) return res.status(400).json({ error: "Not enough parameters" });
        Serie.findByIdAndDelete(id, (err) => {

            if (err) {
                console.log(err)
                return res.status(400).json({ error: "serie eliminada" });

            } else {
                console.log("Deleted : ", title);
                return res.status(200).json({ error: "serie eliminada" });

            }
        });
    }
}