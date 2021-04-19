const express = require('express')
const Client = require('../models/clientSchema');


//declaramos las funciones asi ya se exportan
module.exports = {
    async get_client(req, res) {

        const client = await Client.find();
        if (client) return res.status(200).json({ client });
        else return res.status(404).json({ error: "Not found" });
    },
    async post_client(req, res) {
        const { name, email, dni } = req.body;
        console.log(name, email, dni);

        if (name && email && dni) {
            const checkClient = await Client.findOne({ dni });
            if (!checkClient) {
                const newClient = new Client(req.body);
                await newClient.save();
                console.log(newClient);

                return res.status(201).json({ client: req.body });
            } else {
                return res.status(400).json({ error: " ya existe el dni" });
            }
        } else {

            return res.status(400).json({ error: "no hay datos suficientes" });

        }
    },
    async put_client(req, res) {
        const nombre = req.params.name;
        const { name, email, dni } = req.body;
        const update = {};
        if (name) update.name = name;
        if (email) update.email = email;
        if (dni) update.dni = dni;


        const updateClient = await Client.updateOne(

            { "name": nombre }


            , update);
        if (updateClient.n) {
            return res.status(200).json({ ok: true })
        } else {
            return res.status(404).json({ error: "client not found" });
        }
    },
    async delete_client(req, res) {
        const { id, name } = req.params;
        console.log(id);
        if (!id) return res.status(400).json({ error: "Not enough parameters" });
        Client.findByIdAndDelete(id, (err) => {

            if (err) {
                console.log(err)
                return res.status(400).json({ error: "cliente eliminado" });

            } else {
                console.log("Deleted : ", name);
                return res.status(200).json({ error: "cliente eliminado" });

            }
        });
    }
}