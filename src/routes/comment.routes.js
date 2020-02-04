const { Router } = require('express'); // -- Importar enrutador
const { AuthMiddleware } = require('../middlewares');
module.exports = function({ CommentController }) { // Inyectar controlador AWILIX
    const router = Router(); // Invocar enrutador de express

    router.use(AuthMiddleware);

    router.get('/:commentId/unique', CommentController.get);
    router.get('/:ideaId/allcomments', CommentController.getIdeaComments);
    router.post('/:ideaId', CommentController.createComment);
    router.patch('/:commentId', CommentController.update);
    router.delete('/:commentId', CommentController.delete);

    return router; // retornar rutas
}