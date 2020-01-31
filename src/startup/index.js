/** ==================================
 * Configuracion de inicio al servidor
 ================================== */

const express = require('express');

let _express = null;
let _config = null;

class Server {
    constructor({ config, router }) { // Inyectar variables AWILIX
        _config = config;
        _express = express().use(router); // Cargar rutas en el servidor
    }

    start() { // Metodo para inicializar servidor
        return new Promise(resolve => {
            _express.listen(_config.PORT, () => {
                console.log(_config.APPLICATION_NAME + " API running on port " + _config.PORT);
                resolve();
            });
        });
    }
}

module.exports = Server;