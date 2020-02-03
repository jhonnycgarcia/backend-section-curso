const { Router } = require('express'); // -- Importar enrutador
const { AuthMiddleware, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');
const { CACHE_TIME } = require('../helpers');

module.exports = function({ UserController }) { // Inyectar controlador AWILIX
    const router = Router(); // Invocar enrutador de express

    router.use([AuthMiddleware, ParseIntMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)]);

    router.get('', AuthMiddleware, UserController.getAll);
    router.get('/:userId', UserController.get);
    router.patch('/:userId', UserController.update);
    router.delete('/:userId', UserController.delete);

    return router; // retornar rutas
}