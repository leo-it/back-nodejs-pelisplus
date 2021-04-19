const express = require('express')
const Movie = require('../models/movieSchema');


//declaramos las funciones asi ya se exportan
module.exports = {
    async get_movie(req, res) {

        const movie = await Movie.find();
        if (movie) return res.status(200).json({ movie });
        else return res.status(404).json({ error: "Not found" });
    },
    async get_movie_title(req,res){
        const {params:{title}} = req;
        const movie = await Movie.findOne({title: title});
        if(movie) return res.status(200).json({movie});
        else return res.status(404).json({error: "Not found"});
    }, 
    async get_movie_year(req,res){
        const {params:{year}} = req;
        const movie = await Movie.find({year: year});
        if(movie) return res.status(200).json({movie});
        else return res.status(404).json({error: "Not found"});
    },
    async get_movie_search(req,res){
    const {params:{title}} = req;
        const movie = await Movie.find({title: title});
        if(movie) return res.status(200).json({movie});
        else return res.status(404).json({error: "Not found"});
    },
    async post_movie(req, res) {
        const { title, description, gender, year, img, url } = req.body;
        console.log(title, gender);

        if (title && description && gender && year && img && url) {
            const checkMovie = await Movie.findOne({ title });
            if (!checkMovie) {
                const newMovie = new Movie(req.body);
                await newMovie.save(newMovie);
                console.log(newMovie);

                return res.status(201).json({ movie: req.body });
            } else {
                return res.status(400).json({ error: " ya existe el nobre" });
            }
        } else {

            return res.status(400).json({ error: "no hay propiedades suficientes" });

        }
    },
    async put_movie(req, res) {
        const { id } = req.params;
        const { title, description, gender,year, img, url } = req.body;
        const update = {};
        if (title) update.title = title;
        if (description) update.description = description;
        if (gender) update.gender = gender;
        if (year) update.year = year;
        if (img) update.img = img;
        if (url) update.url = url;



        const updateMovie = await Movie.updateOne(

            { "_id": id }



            , update);
        if (updateMovie.n) { //n == numero de documentos modificados
            return res.status(200).json({ ok: true })
        } else {
            return res.status(404).json({ error: "Movie not found" });
        }
    },
    async delete_movie(req, res) {
        const { id } = req.params;
        console.log(id);
        if (!id) return res.status(400).json({ error: "Not enough parameters" });
        Movie.findByIdAndDelete(id, (err) => {

            if (err) {
                console.log(err)
                return res.status(400).json({ error: "pelicula eliminada" });

            } else {
                console.log("Deleted : ", id);
                return res.status(200).json({ error: "pelicula eliminada" });

            }
        });
    }
}