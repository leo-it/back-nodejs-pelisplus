require('dotenv').config(); //Le decimos que nos cargue las variables de entorno que declaramos en nuestro archivo ".env"
const authMiddleware = require("./auth-middleware");
const path = require('path'); //path lo voy a usar para concatenar el __dirname y la carpeta views
const express = require('express') //importo modulo express el cual utiliza el modulo 'http'
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes')
let USUARIO = "leo"
CONTRASEÑA = "leoeslomas"
DB = "peliculas"
const firebase = require('firebase-admin');
const DB_URL = `mongodb://${USUARIO}:${CONTRASEÑA}@cluster0-shard-00-00.yz03y.mongodb.net:27017,cluster0-shard-00-01.yz03y.mongodb.net:27017,cluster0-shard-00-02.yz03y.mongodb.net:27017/${DB}?ssl=true&replicaSet=atlas-ump2qn-shard-0&authSource=admin&retryWrites=true&w=majority`
var serviceAccount = require("../credentialGoogle.json");

 firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://pelis-beafa-default-rtdb.firebaseio.com/"
}); 
/**/
/* 
admin.initializeApp({
    credential: admin.credential.refreshToken(refreshToken),
    databaseURL: 'https://pelis-beafa-default-rtdb.firebaseio.com/'
  });

 */

//const db = admin.database();

/* const idToken = '0WVk549UH7etaohDGQbpcPRLnJf1';

// idToken comes from the client app
admin
  .auth()
  .verifyIdToken(idToken)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    // ...
  })
  .catch((error) => {
    // Handle error
  });

 */
const PORT = process.env.PORT || 3000; //Buscamos la variable PORT en el entorno y si no usamos por defecto el numero 3000

mongoose.connect(DB_URL, { //Metodo para conectar a la base de datos, tiene 3 parametros:
    useNewUrlParser: true, //Primero le pasamos la URI con las credenciales de acceso en DB_URL
    useUnifiedTopology: true //Segundo le pasamos un objeto con opciones de config, las que use yo son las basicas a usar para no tener problemas de conexion
}, () => {
    console.log('MongoDB conectado');
})



const app = express(); //modulo express devuelve un objeto que guardo en la constante app
app.use(cors()); //se encargara de manejar errores de cors, hay muchas alternativas a este
app.use(express.json()); //Se encarga de parsear el body de las request, si no lo ponemos no podemos leerlo
app.use('/', routes, authMiddleware); //Usamos nuestro archivo routes como middleware personalizado





try {
    app.listen(PORT, () => { //Escuchamos al puesto PORT
        console.log(`Server on port  http://localhost:${PORT}`);
    })
} catch (error) {
    console.log(`Error on port ${PORT}`, error); //En caso de error veremos esto en nuestra consola
}


