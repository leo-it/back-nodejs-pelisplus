const express = require('express')
const User = require('../models/userSchema');


//declaramos las funciones asi ya se exportan
module.exports = {
    async get_user(req, res) {

        const user = await User.find();
        if (user) return res.status(200).json({ user });
        else return res.status(404).json({ error: "Not found" });
    },
    async post_user(req, res) {
        const { name, email } = req.body;
        console.log(name, email);

        if (name && email) {
            const checkUser = await User.findOne({ name });
            if (!checkUser) {
                const newUser = new User(req.body);
                await newUser.save();
                console.log(newUser);

                return res.status(201).json({ user: req.body });
            } else {
                return res.status(400).json({ error: " ya existe el nobre" });
            }
        } else {

            return res.status(400).json({ error: "no hay propiedades suficientes" });

        }
    },
    async put_user(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;
        const update = {};
        if (name) update.name = name;
        if (email) update.email = email;


        const updateUser = await User.updateOne(

            { "_id": id },

            update);
        if (updateUser.n) { //n == numero de documentos modificados
            return res.status(200).json({ ok: true })
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    },
    async delete_user(req, res) {
        const { id, name } = req.params;
        console.log(id);
        if (!id) return res.status(400).json({ error: "Not enough parameters" });
        User.findByIdAndDelete(id, (err) => {

            if (err) {
                console.log(err)
                return res.status(400).json({ error: "usuario eliminado" });

            } else {
                console.log("Deleted : ", name);
                return res.status(200).json({ error: "usuario eliminado" });

            }
        });
    }
}