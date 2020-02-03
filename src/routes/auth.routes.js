const { Router } = require('express'); // -- Importar enrutador
module.exports = function({ AuthController }) { // Inyectar controlador AWILIX
    const router = Router(); // Invocar enrutador de express

    router.post('/signUp', AuthController.signUp);
    router.post('/signIn', AuthController.signIn);
    return router;
}