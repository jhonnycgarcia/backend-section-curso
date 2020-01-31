const { Router } = require('express'); // -- Importar enrutador
module.exports = function({ HomeController }) { // Inyectar controlador AWILIX
    const router = Router(); // Invocar enrutador de express

    router.get('/', HomeController.index);

    return router; // retornar rutas
}