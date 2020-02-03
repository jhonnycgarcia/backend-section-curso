const { Router } = require('express'); // -- Importar enrutador
module.exports = function({ IdeaController }) { // Inyectar controlador AWILIX
    const router = Router(); // Invocar enrutador de express

    router.get('/', IdeaController.getAll);
    router.get('/:ideaId', IdeaController.get);
    router.get('/:userId/all', IdeaController.getUserIdeas);
    router.post('/', IdeaController.create);
    router.post('/:ideaId/upvote', IdeaController.upvoteIdea);
    router.post('/:ideaId/downvote', IdeaController.downvoteIdea);
    router.patch('/:ideaId', IdeaController.update);
    router.delete('/:ideaId', IdeaController.delete);

    return router; // retornar rutas
}