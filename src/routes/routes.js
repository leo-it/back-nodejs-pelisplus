//Aca usamos express.Router(), se va a encargar del enrutamineto de la api.
const routes = require('express').Router();
//Traemos las funciones controladoras que se encargam de manejar las request


const { get_user, post_user, put_user, delete_user } = require('../controllers/userController.js');


routes.get('/api/user', get_user);
routes.post('/api/post-user', post_user);
routes.put('/api/update-user/:id', put_user);
routes.delete('/api/delete-user/:id', delete_user);



const { get_movie, get_movie_title, get_movie_year, get_movie_search, post_movie, put_movie, delete_movie } = require('../controllers/movieController.js');


routes.get('/api/movie', get_movie);
routes.get('/api/movie_year/:year', get_movie_year);
routes.get('/api/movie_title/:title',  get_movie_title);
routes.get('/api/movie_search/:title',  get_movie_search);
routes.post('/api/post-movie', post_movie);
routes.put('/api/update-movie/:id', put_movie);
routes.delete('/api/delete-movie/:id', delete_movie);

const { get_client, post_client, put_client, delete_client } = require('../controllers/clientController.js');


routes.get('/api/client', get_client);
routes.post('/api/post-client', post_client);
routes.put('/api/update-client/:nombre', put_client);
routes.delete('/api/delete-client/:id', delete_client);

const { get_serie, post_serie, put_serie, delete_serie } = require('../controllers/serieController.js');


routes.get('/api/serie', get_serie);
routes.post('/api/post-serie', post_serie);
routes.put('/api/update-serie/:id', put_serie);
routes.delete('/api/delete-serie/:id', delete_serie);

const { get_episode, post_episode, put_episode, delete_episode } = require('../controllers/episodesController.js');


routes.get('/api/episode', get_episode);
routes.post('/api/post-episode', post_episode);
routes.put('/api/update-episode/:id', put_episode);
routes.delete('/api/delete-episode/:id', delete_episode);

const { get_historic, post_historic, put_historic, delete_historic } = require('../controllers/historicController.js');


routes.get('/api/historic', get_historic);
routes.post('/api/post-historic', post_historic);
routes.put('/api/update-historic/:id', put_historic);
routes.delete('/api/delete-historic/:id', delete_historic);

const { get_coment, post_coment, put_coment, delete_coment } = require('../controllers/comentsController.js');


routes.get('/api/coment', get_coment);
routes.post('/api/post-coment', post_coment);
routes.put('/api/update-coment/:id', put_coment);
routes.delete('/api/delete-coment/:id', delete_coment);



module.exports = routes;