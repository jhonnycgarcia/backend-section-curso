const container = require('./src/startup/container'); // cargar contenedor
const server = container.resolve('app'); // Cargar servidor de las definiciones del contenedor
const { MONGO_URI } = container.resolve('config'); // Cargar variables de entorno

const mongoose = require('mongoose');
mongoose.set("useCreateIndex", true);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        server.start(); // Iniciar servidor
    })
    .catch(console.log);