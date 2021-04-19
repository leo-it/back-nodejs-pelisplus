const express = require('express')
const Historic = require('../models/historicSchema');


//declaramos las funciones asi ya se exportan
module.exports = {
    async get_historic(req, res) {

        const historic = await Historic.find();
        if (historic) return res.status(200).json({ historic });
        else return res.status(404).json({ error: "Not found" });
    },
    async post_historic(req, res) {
        const { title, email, gender } = req.body;
        console.log(title, email, gender);

        if (title && email && gender) {
            const checkhistoric = await Historic.findOne({ title });
            if (!checkhistoric) {
                const newhistoric = new Historic(req.body);
                await newhistoric.save();
                console.log(newhistoric);

                return res.status(201).json({ historic: req.body });
            } else {
                return res.status(400).json({ error: " ya existe" });
            }
        } else {

            return res.status(400).json({ error: "no hay propiedades suficientes" });

        }
    },
    async put_historic(req, res) {
        const { id } = req.params;
        const { title, email, gender } = req.body;
        const update = {};
        if (title) update.title = title;
        if (email) update.email = email;
        if (gender) update.gender = gender;


        const updatehistoric = await Historic.updateOne({
            $or: [
                { "_id": id },

            ]
        }, update);
        if (updatehistoric.n) { //n == numero de documentos modificados
            return res.status(200).json({ ok: true })
        } else {
            return res.status(404).json({ error: "Historic not found" });
        }
    },
    async delete_historic(req, res) {
        const { id, title } = req.params;
        console.log(id);
        if (!id) return res.status(400).json({ error: "Not enough parameters" });
        Historic.findByIdAndDelete(id, (err) => {

            if (err) {
                console.log(err)
                return res.status(400).json({ error: "historicario eliminado" });

            } else {
                console.log("Deleted : ", title);
                return res.status(200).json({ error: "historicario eliminado" });

            }
        });
    }
}