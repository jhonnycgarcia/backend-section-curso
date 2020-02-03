const { Router } = require('express'); // -- Importar enrutador
const { AuthMiddleware } = require('../middlewares');
module.exports = function({ UserController }) { // Inyectar controlador AWILIX
    const router = Router(); // Invocar enrutador de express

    router.use(AuthMiddleware);

    router.get('', AuthMiddleware, UserController.getAll);
    router.get('/:userId', UserController.get);
    router.patch('/:userId', UserController.update);
    router.delete('/:userId', UserController.delete);

    return router; // retornar rutas
}