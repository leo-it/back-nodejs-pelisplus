const express = require('express')
const Coments = require('../models/comentsSchema');


//declaramos las funciones asi ya se exportan
module.exports = {
    async get_coment(req, res) {

        const coment = await Coments.find();
        if (coment) return res.status(200).json({ coment });
        else return res.status(404).json({ error: "Not found" });
    },
    async post_coment(req, res) {
        const { name, email, description } = req.body;
        console.log(name, email, description);

        if (name && email && description) {
            const checkComent = await Coments.findOne({ name });
            if (!checkComent) {
                const newComent = new Coments(req.body);
                await newComent.save();
                console.log(newComent);

                return res.status(201).json({ coment: req.body });
            } else {
                return res.status(400).json({ error: " ya existe" });
            }
        } else {

            return res.status(400).json({ error: "no hay propiedades suficientes" });

        }
    },
    async put_coment(req, res) {
        const { nameoremailordescription } = req.params;
        const { name, email, description } = req.body;
        const update = {};
        if (name) update.name = name;
        if (description) update.description = description;
        if (email) update.email = email;


        const updateComent = await Coments.updateOne({
            $or: [
                { "name": nameoremailordescription },
                { "description": nameoremailordescription },
                { "email": nameoremailordescription }
            ]
        }, update);
        if (updateComent.n) { //n == numero de documentos modificados
            return res.status(200).json({ ok: true })
        } else {
            return res.status(404).json({ error: "Coments not found" });
        }
    },
    async delete_coment(req, res) {
        const { id, name } = req.params;
        console.log(id);
        if (!id) return res.status(400).json({ error: "Not enough parameters" });
        Coments.findByIdAndDelete(id, (err) => {

            if (err) {
                console.log(err)
                return res.status(400).json({ error: "comentario eliminado" });

            } else {
                console.log("Deleted : ", name);
                return res.status(200).json({ error: "comentario eliminado" });

            }
        });
    }
}